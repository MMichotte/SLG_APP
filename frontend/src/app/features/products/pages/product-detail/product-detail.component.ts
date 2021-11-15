import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductTransaction } from '../../models/product-transaction.model';
import { ProductService } from '../../services/product.service';
import { VAT } from '@core/constants/VAT';
import { tableSort } from '@core/helpers/table-sort';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  public tableSort = tableSort;
  @ViewChild('pdfGenerator') pdfGenerator: any;

  product: Product;
  transactions: ProductTransaction[] = [];
  
  transactionCols: any[];
  loadingData: boolean;

  constructor(
    private readonly productService: ProductService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const prodId = this.route.snapshot.params.id;
      this.product = await this.productService.getOne(prodId).toPromise(); // TODO catch if error! 
      this.product.reservedQuantity = (this.product.reservedQuantity) ? this.product.reservedQuantity : 0;
      this.product.salePriceHT = Number(Number(this.product.salePriceHT).toFixed(2));
      this.product.salePriceTTC = Number((this.product.salePriceHT * VAT).toFixed(2));
    } catch (e) {
      console.log(e);
      this.router.navigate(['products']);
    }
    this.getStockUpdates();
    this.getReceivedProducts();
    this.transactionCols = [
      { field: 'updatedAt', header: 'Date' },
      { field: 'billId', header: 'Bill n°' },
      { field: 'type', header: 'Type' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'price', header: 'Last Price (€)' },
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
  
  getReceivedProducts(): void {
    this.loadingData = true;
    this.productService.getAllReceivedProductOrders(this.product.id).subscribe(
      (res: any) => {
        res.forEach(prod => {
          const newHistory: any = {
            updatedAt: prod.product.updatedAt.split('T')[0],
            billId: prod.billSupplierId,
            type: '',
            quantity: `+${prod.quantityReceived}`,
            price: prod.pcPurchasePriceHTAtDate,
            note: prod.note
          };
          
          this.transactions = [...this.transactions, newHistory];
        });
        this.cd.detectChanges();
        this.loadingData = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  showBillPDF(rowData): void {
    if (!rowData.type && +rowData.quantity > 0) {
      this.pdfGenerator.generateBillSupplierPDF(rowData.billId);
    }
  }

}
