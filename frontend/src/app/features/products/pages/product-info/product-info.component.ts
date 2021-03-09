import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./../../../style.scss', './product-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductInfoComponent implements OnInit {

  product: Product;
  transactions: any[] = [];

  transactionCols: any[];
  loadingData: boolean;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) { 
    try {
      this.product = this.router.getCurrentNavigation().extras.state.product;
      this.getStockUpdates();
    } catch (e) {
      console.log(e);
      this.router.navigate(['products']);
    }
  }

  ngOnInit(): void {
    this.transactionCols = [
      { field: 'updatedAt', header: 'Date' },
      { field: 'id', header: 'Bill n°' },
      { field: 'type', header: 'Type' },
      { field: 'quantity', header: 'Total quantity' },
      { field: 'price', header: 'Price' },
      { field: 'note', header: 'Note' }
    ];
  }

  getStockUpdates(): void {
    this.productService.getAllStockUpdates(this.product.id).subscribe(
      (res: any) => {
        console.log(res);
        // this.cd.detectChanges();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
