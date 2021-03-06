import { VAT } from '@core/constants/VAT';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { ProductService } from './../../services/product.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StockUpdateFormComponent } from '../stock-update-form/stock-update-form.component';
import { AuthService } from '@core/services/auth.service';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { take } from 'rxjs/operators';
import { debounce } from '@core/helpers/debounce';

// auth.hasMinAccess(EUserRoles.USER)

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() currentProduct?: Product;
  @Input() isUpdate?: boolean;

  @Output() refreshTable? = new EventEmitter<any>();

  public EUserRoles = EUserRoles;

  constructor (
    public readonly auth: AuthService,
    private readonly productService: ProductService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef
  ) { }

  productForm = new FormGroup({
    reference: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
    quantity: new FormControl(0, Validators.required),
    reservedQuantity: new FormControl({ value: 0, disabled: true }, Validators.required),
    availableQuantity: new FormControl({ value: 0, disabled: true }, Validators.required),
    purchasePriceHT: new FormControl(0, Validators.required),
    salePriceHT: new FormControl(0, Validators.required),
    salePriceTTC: new FormControl(0, Validators.required),
    margin: new FormControl(0, Validators.required),
    marginPc: new FormControl(0),
    note: new FormControl('')
  });

  ngOnInit (): void {
  }
  
  ngOnChanges ():void {
    if (this.currentProduct) {
      for (const field in this.productForm.controls) {
        const control = this.productForm.get(field);
        control.setValue(this.currentProduct[field]);
      }
      this.productForm.controls.marginPc.setValue(
        (this.currentProduct.salePriceHT > 0)
          ? 100 * +this.currentProduct.margin / +this.currentProduct.salePriceHT
          : 0
      );  
      if (this.auth.hasMinAccess(EUserRoles.USER)) {
        this.productForm.enable();
        this.productForm.controls.reservedQuantity.disable();
        this.productForm.controls.availableQuantity.disable();
        this.productForm.controls.salePriceTTC.disable();
      }
    } else {
      this.productForm.disable();
      this._resetForm();
    }
  }

  async submitForm (): Promise<void> {
    const product: Product = new Product(this.productForm.value);
    delete product.availableQuantity;
    delete product.margin;
    delete product.marginPc;
    product.purchasePriceHT = +product.purchasePriceHT;
    product.salePriceHT = +product.salePriceHT;
    if (this.isUpdate) {
      // update
      if (product.quantity !== this.currentProduct.quantity) {
        const quantUpdated = await this.showStockUpdateModal(product.quantity - this.currentProduct.quantity);
        if (quantUpdated === -1) {
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The product was not updated');
          return;
        } else if (quantUpdated === 0) {
          product.quantity = this.currentProduct.quantity; // reset quant for next check! -> if the quant was changed it will be set in the backend
          this.productForm.controls.quantity.setValue(product.quantity);
          this.calcAvailableQuant();
        }
        
      }
      if (product.equals(this.currentProduct)) {
        this.toast.show(EToastSeverities.INFO, 'Nothing to update!');
        return;
      }
      this.productService.update(this.currentProduct.id, product).subscribe(
        (res: any) => {
          this._resetForm();
          this.refreshTable.emit();
          this.toast.show(EToastSeverities.SUCCESS, 'Product updated');
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A product with this reference already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The product was not updated');
        }
      );
    } else {
      // create
      this.productService.create(product).subscribe(
        (res: any) => {
          this._resetForm();
          this.toast.show(EToastSeverities.SUCCESS, 'Product created');
          this.ref.close(res.id);
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A product with this reference already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The product was not created');
        }
      );
    }
  }

  async showStockUpdateModal(quantityDiff: number): Promise<number> {
    const ref = this.dialogService.open(StockUpdateFormComponent, {
      header: 'Update Quantity',
      data: {
        quantityDiff: quantityDiff,
        prodId: this.currentProduct.id
      },
      width: '30%'
    });
    const dialogResp: any = await ref.onClose.pipe(take(1)).toPromise();
    if (!dialogResp) return 0; // quant update canceled
    else if (dialogResp === -1) return -1; // quant update failed
    return 1; // quant update succeeded
  }
  
  async deleteProduct (): Promise<void> {
    if (this.currentProduct) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following product:
            \n<b> ${this.currentProduct.reference} - ${this.currentProduct.label}</b>`);

      if (confirm) {
        this.productService.delete(this.currentProduct.id).subscribe(
          (res: any) => { 
            this._resetForm();
            this.refreshTable.emit();
            this.toast.show(EToastSeverities.SUCCESS, 'Product deleted');
          },
          (error: any) => {
            console.log(error);
            this.toast.show(EToastSeverities.ERROR, 'An error occurred. The product was not deleted');
          }
        );
      }
    }
  }
  
  calcAvailableQuant(): void {
    const totQant = this.productForm.get('quantity').value;
    const reservedQuant = this.productForm.get('reservedQuantity')?.value || 0; 
    const newQuant = totQant - reservedQuant;
    this.productForm.controls.availableQuantity.setValue(newQuant);
  }

  onMarginInput(val: string): void {
    val = val.replace(',', '');
    const margin: number = Number(val.replace('€', ''));
    const newSalePrice = Number(this.productForm.get('purchasePriceHT').value) + margin;
    this.productForm.controls.salePriceHT.setValue(newSalePrice);
    this.productForm.controls.salePriceTTC.setValue(newSalePrice * VAT);
    this._checkPriceValidity(this.productForm.controls.purchasePriceHT.value, newSalePrice);
    // TODO set marginPc 
  }

  onMarginPcInput(val: string): void {
    val = val.replace(',', '');
    const marginPc: number = Number(val.replace('%', '')) / 100;
    const purchasePriceHT: number = Number(this.productForm.get('purchasePriceHT').value);
    const margin: number = purchasePriceHT * marginPc;
    const newSalePrice = purchasePriceHT + margin;
    this.productForm.controls.margin.setValue(margin);
    this.productForm.controls.salePriceHT.setValue(newSalePrice);
    this.productForm.controls.salePriceTTC.setValue(newSalePrice * VAT);
    this._checkPriceValidity(this.productForm.controls.purchasePriceHT.value, newSalePrice);
  }

  onSalePriceInput(val: string): void {
    val = val.replace(',', '');
    const saleP: number = Number(val.replace('€', ''));
    const newMargin = saleP - Number(this.productForm.get('purchasePriceHT').value);
    this.productForm.controls.margin.setValue(newMargin);
    this.productForm.controls.salePriceTTC.setValue(saleP * VAT);
    this._checkPriceValidity(this.productForm.controls.purchasePriceHT.value, saleP);
  }
  
  onPurchasePriceInput(val: string): void {
    val = val.replace(',', '');
    const purchaseP: number = Number(val.replace('€', ''));
    const newMargin = Number(this.productForm.get('salePriceHT').value) - purchaseP;
    this.productForm.controls.margin.setValue(newMargin);
    this._checkPriceValidity(purchaseP, this.productForm.controls.salePriceHT.value);
  }

  // TODO only when field out of focus!
  private _checkPriceValidity(purchaseHT: number, saleHT: number): void {
    if (saleHT < purchaseHT) {
      this.displayWarn();
    }
  }

  displayWarn = debounce(
    () => { this.toast.show(EToastSeverities.WARN, 'You are about to set a sale price lower than the purchase price!'); }, 
    500,
    true
  );

  private _resetForm (): void {
    this.productForm.reset({
      quantity: 0,
      reservedQuantity: 0,
      availableQuantity: 0,
      purchasePriceHT: 0,
      salePriceHT: 0,
      salePriceTTC: 0,
      margin: 0,
      marginPc: 0,
      note: ' '
    });
  }

  onCancel(): void {
    this.currentProduct = null;
    this.ref.close();
  }

}
