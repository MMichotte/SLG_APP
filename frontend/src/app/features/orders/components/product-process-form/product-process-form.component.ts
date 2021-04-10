import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { OrderService } from './../../services/order.service';
import { LightProduct } from '../../models/light-product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '@features/products/components/product-form/product-form.component';

@Component({
  selector: 'app-product-process-form',
  templateUrl: './product-process-form.component.html',
  styleUrls: ['../../../../shared/styles/form.scss', './product-process-form.component.scss']
})
export class ProductProcessFormComponent implements OnInit {

  public EUserRoles = EUserRoles;

  products: LightProduct[];
  productsFiltered: LightProduct[];
  selectedProduct: LightProduct;

  constructor(
    public readonly auth: AuthService,
    public readonly cd: ChangeDetectorRef,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    private readonly orderService: OrderService
  ) {
    this.productsFiltered = [];
  }

  productForm = new FormGroup({
    productId: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this._getLightProducts();
  }

  submitForm(): void {  
    this.ref.close(this.selectedProduct);
  }

  private async _getLightProducts(): Promise<void> {
    await this.orderService.getAllLightProducts().toPromise().then(
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
    this.productForm.controls.productId.setValue(this.selectedProduct.id);
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
    ref.onClose.subscribe(async (prodId?: number) => {
      if (prodId) {
        await this._getLightProducts();
        const pr = this.products.find(p => p.id === prodId);
        this.selectedProduct = pr;
        this.productForm.controls.productId.setValue(pr.id);
      }
    });
  }

  private _resetForm(): void {
    this.selectedProduct = null;
    this.productForm.reset({
      productId: null
    });
  }

}
