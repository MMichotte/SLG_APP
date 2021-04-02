import { EOrderStatus } from './../../enums/order-status.enum';
import { OrderService } from './../../services/order.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductOrder } from './../../models/product-order.model';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { LightProduct } from '../../models/light-product';
import { ProductOrderService } from '../../services/product-order.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../../products/components/product-form/product-form.component';

@Component({
  selector: 'app-product-order-form',
  templateUrl: './product-order-form.component.html',
  styleUrls: ['../../../form.scss', './product-order-form.component.scss']
})
export class ProductOrderFormComponent implements OnInit, OnChanges {

  @Input() orderId?: number;
  @Input() currentProduct: ProductOrder;
  @Output() currentProductChange = new EventEmitter<ProductOrder>();
  @Input() existingProducts?: ProductOrder[];
  @Output() refreshTable= new EventEmitter<any>();

  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;

  products: LightProduct[];
  productsFiltered: LightProduct[];
  selectedProduct: LightProduct;

  isUpdate: boolean = false;

  constructor(
    public readonly auth: AuthService,
    public readonly cd: ChangeDetectorRef,
    public dialogService: DialogService,
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductOrderService
  ) {
    this.productsFiltered = [];
  }

  productForm = new FormGroup({
    productId: new FormControl(null, Validators.required),
    quantityOrdered: new FormControl(1, [Validators.required, Validators.min(1)]),
    note: new FormControl(null)
  });

  ngOnInit(): void {
    this._getLightProducts();
  }

  submitForm(): void {  
    const productOrder = this.productForm.getRawValue();
    productOrder.quantityOrdered = +productOrder.quantityOrdered;
    productOrder.orderId = +this.orderId;
    if (!this.isUpdate) {
      this.productOrderService.create(productOrder).subscribe(
        (res: any) => {
          this.refreshTable.emit();
        }
      );
    } else {
      productOrder.status = this.currentProduct.status;
      delete productOrder.productId;
      this.productOrderService.update(this.currentProduct.id, productOrder).subscribe(
        (res: any) => {
          this.refreshTable.emit();
        }
      );
    }
    this._resetForm();
  }

  private _getLightProducts():void {
    this.orderService.getAllLightProducts().subscribe(
      (products: LightProduct[]) => {
        this.products = products.map(p => {
          p.displayName = `${p.reference} - ${p.label}`;
          return p;
        }); 
        this.productsFiltered = this.products;
      }
    );
  }

  searchProduct(input: string) {
    let words: string[] = input.split(' ');
    words = words.filter(w => w.length > 1);
    this.productsFiltered = this.products?.filter(
      (lP: any) => { 
        for (const word of words) {
          if (!lP.displayName.toLowerCase().includes(word.toLowerCase())) {
            return false;
          }
        };
        return true;
      }
    ).slice(0, 200);
  }

  onSelectProduct(): void {
    // check if prod already exists
    const existingProd = (this.existingProducts?.find(p => p.product.id === this.selectedProduct.id));
    this.isUpdate = !!existingProd;
    if (this.isUpdate) {
      this.currentProduct = existingProd;
      this.currentProductChange.emit(this.currentProduct);
      this.productForm.controls.productId.setValue(this.selectedProduct.id);
      this.productForm.controls.quantityOrdered.setValue(existingProd.quantityOrdered);
      this.productForm.controls.note.setValue(existingProd.note);
    } else {
      this.productForm.controls.productId.setValue(this.selectedProduct.id);
    }
  }

  onSelectClick(): void {
    this.selectedProduct = null;
    this._resetForm();
  }

  showNewProductModal(): void {
    const ref = this.dialogService.open(ProductFormComponent, {
      header: 'New Product',
      width: '60%'
    });
    ref.onClose.subscribe((prodId?: number) => {
      if (prodId) this._getLightProducts();
    });
  }

  ngOnChanges(): void {
    if (!this.auth.hasMinAccess(EUserRoles.USER)) {
      this.productForm.disable();
    } else {
      this.productForm.enable();
    }
    if (this.currentProduct) {
      this.isUpdate = true;
      this.selectedProduct = this.products?.find(p => p.id === this.currentProduct.product.id);
      this.productForm.controls.productId.setValue(this.currentProduct.product.id);
      this.productForm.controls.quantityOrdered.setValue(this.currentProduct.quantityOrdered);
      this.productForm.controls.note.setValue(this.currentProduct.note);
    } else {
      this._resetForm();
    }
  }

  private _resetForm(): void {
    this.selectedProduct = null;
    this.isUpdate = false;
    this.productForm.reset({
      productId: null,
      quantityOrdered: 1,
      note: null
    });
  }
}
