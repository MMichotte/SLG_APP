import { VAT } from '@core/constants/VAT';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SortEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  @ViewChild(Table) private dt: Table;

  public EUserRoles = EUserRoles;
  
  cols: any[];
  products: Product[] = [];
  selectedProduct: Product;
  loadingData: boolean;
  exactMatch: boolean = false;
  previousSearchVal: string = '';

  constructor(
    public readonly auth: AuthService,
    private readonly productService: ProductService,
    public dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.refreshProducts();
    this.cols = [
      { field: 'reference', header: 'Reference' },
      { field: 'label', header: 'Label', width: '20%' },
      { field: 'availableQuantity', header: 'Available quantity' },
      { field: 'quantity', header: 'Total quantity' },
      { field: 'reservedQuantity', header: 'Reserved quantity' },
      { field: 'purchasePriceHT', header: 'Purchase price HT' },
      { field: 'salePriceHT', header: 'Sale price HT' },
      { field: 'salePriceTTC', header: 'Sale price TTC' },
      { field: 'margin', header: 'Margin' }
    ];
  }

  refreshProducts(): void {
    this.loadingData = true;
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        products.map((p: Product) => {
          p.margin = Number((p.salePriceHT - p.purchasePriceHT).toFixed(2));
          p.availableQuantity = Number((p.quantity - p.reservedQuantity).toFixed(2));
          p.salePriceTTC = Number((p.salePriceHT * VAT).toFixed(2));
          return p;
        });
        this.products = products;
        this.selectedProduct = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showNewProductModal(): void {
    const ref = this.dialogService.open(ProductFormComponent, {
      header: 'New Product',
      width: '60%'
    });
    ref.onClose.subscribe((prodId?: boolean) => {
      if (prodId) this.refreshProducts();
    });
  }

  showProductInfoPage(product: Product): void {
    this.router.navigate([`products/${product.id}/detail`]);
  }

  search(val?: string): void {
    if (val === '') {
      this.dt.filterGlobal('', 'contains');
      return;
    }
    const value = (!val) ? this.previousSearchVal : val;
    if (this.exactMatch) {
      this.dt.filterGlobal(value, 'equals');
    } else {
      this.dt.filterGlobal(value, 'contains');
    }
    this.previousSearchVal = value;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1: any = data1[event.field];
      const value2: any = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        if (!isNaN(value1 as any) && !isNaN(value2 as any)) {
          const num1 = parseInt(value1); 
          const num2 = parseInt(value2); 
          const calc = num1 - num2;
          result = (calc) ? (calc / Math.abs(calc)) : 0; 
        } else {
          result = value1.localeCompare(value2);
        }
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }

      return (event.order * result);
    });
  }

}
