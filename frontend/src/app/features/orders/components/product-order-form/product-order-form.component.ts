import { OrderService } from './../../services/order.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductOrder } from './../../models/product-order.model';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { LightProduct } from '../../models/light-product';

@Component({
  selector: 'app-product-order-form',
  templateUrl: './product-order-form.component.html',
  styleUrls: ['../../../form.scss', './product-order-form.component.scss']
})
export class ProductOrderFormComponent implements OnInit, OnChanges {

  @Input() orderId: number;
  @Input() currentProduct: ProductOrder;
  @Output() currentProductChange = new EventEmitter<ProductOrder>();
  @Input() existingProducts?: ProductOrder[];
  @Output() refreshTable?= new EventEmitter<any>();

  public EUserRoles = EUserRoles;

  products: LightProduct[];
  productsFiltered: LightProduct[];
  selectedProduct: LightProduct;

  isUpdate: boolean = false;

  constructor(
    public readonly auth: AuthService,
    public readonly cd: ChangeDetectorRef,
    private readonly orderService: OrderService
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
    if (!this.isUpdate) {
      this.orderService.addProduct(this.orderId, productOrder).subscribe(
        (res: any) => {
          this.refreshTable.emit();
          this._resetForm();
        }
      );
    } else {
      productOrder.status = this.currentProduct.status;
      this.orderService.updateProduct(this.orderId, this.currentProduct.id, productOrder).subscribe(
        (res: any) => {
          this.refreshTable.emit();
          this._resetForm();
        }
      );
    }

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
    this.productsFiltered = this.products.filter(
      (lS: any) => { return lS.displayName.toLowerCase().includes(input.toLowerCase()); }
    ).slice(0, 200);
  }

  onSelectProduct(): void {
    // check if prod already exists
    const existingProd = (this.existingProducts.find(p => p.product.id === this.selectedProduct.id));
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

  ngOnChanges(): void {
    if (this.currentProduct) {
      this.selectedProduct = this.products.find(p => p.id === this.currentProduct.product.id);
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
