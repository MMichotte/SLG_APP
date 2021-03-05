import { ConfirmDialogService } from './../../../../core/services/confirm-dialog.service';
import { ToastService } from './../../../../core/services/toast.service';
import { ProductService } from './../../services/product.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { EToastSeverities } from 'src/app/core/enums/toast-severity.enum';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() currentProduct?: Product;
  @Input() isUpdate?: boolean;

  @Output() refreshTable? = new EventEmitter<any>();

  constructor (
    private readonly productService: ProductService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
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
      this.productForm.enable();
      this.productForm.controls.reservedQuantity.disable();
      this.productForm.controls.availableQuantity.disable();
    } else {
      this.productForm.disable();
      this._resetForm();
    }
  }

  submitForm (): void {
    const product: Product = this.productForm.value;
    delete product.availableQuantity;
    delete product.margin;
    if (this.isUpdate) {
      // update
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
          this.ref.close();
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A product with this reference already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The product was not created');
        }
      );
    }
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
            this.toast.show(EToastSeverities.SUCCESS, 'Product created');
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
    const newSalePrice = this.productForm.get('purchasePriceHT').value + margin;
    this.productForm.controls.salePriceHT.setValue(newSalePrice);
  }

  onSalePriceInput(val: string): void {
    val = val.replace(',', '');
    const saleP: number = Number(val.replace('€', ''));
    const newMargin = saleP - this.productForm.get('purchasePriceHT').value;
    this.productForm.controls.margin.setValue(newMargin);
  }
  
  onPurchasePriceInput(val: string): void {
    val = val.replace(',', '');
    const purchaseP: number = Number(val.replace('€', ''));
    const newMargin = this.productForm.get('salePriceHT').value - purchaseP;
    this.productForm.controls.margin.setValue(newMargin);
  }

  private _resetForm (): void {
    this.productForm.reset({
      quantity: 0,
      reservedQuantity: 0,
      availableQuantity: 0,
      purchasePriceHT: 0,
      salePriceHT: 0,
      salePriceTTC: 0,
      margin: 0,
      note: ' '
    });
  }

  onCancel(): void {
    this.currentProduct = null;
    this.ref.close();
  }

}
