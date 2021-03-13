import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductTransaction } from '../../models/product-transaction.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./../../../style.scss', './product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  transactions: ProductTransaction[] = [];
  
  transactionCols: any[];
  loadingData: boolean;

  constructor(
    private readonly productService: ProductService,
    public readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) { 
    try {
      this.product = this.router.getCurrentNavigation().extras.state.product;
    } catch (e) {
      console.log(e);
      this.router.navigate(['products']);
    }
  }

  ngOnInit(): void {
    this.getStockUpdates();
    this.transactionCols = [
      { field: 'updatedAt', header: 'Date' },
      { field: 'billId', header: 'Bill n°' },
      { field: 'type', header: 'Type' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'price', header: 'Price' },
      { field: 'note', header: 'Note' }
    ];
  }

  getStockUpdates(): void {
    this.loadingData = true;
    this.productService.getAllStockUpdates(this.product.id).subscribe(
      (res: any) => {
        res.map((tr: any) => { 
          tr.updatedAt = tr.updatedAt.split('T')[0];
          tr.quantity = (tr.quantity > 0) ? `+${tr.quantity}` : tr.quantity;
          return tr;
        });
        this.transactions = [...this.transactions, ...res];
        this.cd.detectChanges();
        this.loadingData = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
