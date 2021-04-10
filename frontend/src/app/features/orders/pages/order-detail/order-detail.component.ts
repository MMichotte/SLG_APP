import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { EOrderStatus } from '../../enums/order-status.enum';
import { EProductOrderStatus } from '../../enums/product-order-status.enum';
import { ProductOrder } from '../../models/product-order.model';
import { ProductOrderService } from '../../services/product-order.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { tableSort } from '@core/helpers/table-sort';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './../common-style.scss', './order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  
  public tableSort = tableSort;
  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;
  public EProductOrderStatus = EProductOrderStatus;

  cols: any[];
  order: Order;
  productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;

  loadingData: boolean;

  constructor(
    public readonly auth: AuthService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly cd: ChangeDetectorRef,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductOrderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cols = [
      { field: 'note', header: 'Note', width: '15%' },
      { field: 'status', header: 'Status' },
      { field: 'quantityOrdered', header: 'Quantity Ordered' },
      { field: 'quantityReceived', header: 'Quantity Received' },
      { field: 'updatedAt', header: 'Received At' },
      { field: 'billSupplierId', header: 'Bill n°' }
    ];
    try {
      const orderId = +this.route.snapshot.params.id;
      this.order = await this.orderService.getOne(orderId).toPromise();
      this.refreshProducts();
    } catch (e) {
      console.log(e);
      this.router.navigate(['orders']);
    }
  }

  refreshProducts(): void {
    this.loadingData = true;
    this.productOrderService.getAllByOrderId(this.order.id).subscribe(
      (products: ProductOrder[]) => {
        this.productOrders = products.map((p: ProductOrder) => {
          p.productDisplayName = `${p.product.reference} - ${p.product.label}`;
          p.createdAt = (new Date(p.createdAt)).toLocaleDateString();
          p.updatedAt = (p.status === EProductOrderStatus.RECEIVED) ? (new Date(p.updatedAt)).toLocaleDateString() : null;
          return p;
        });
        this.selectedProductOrder = null;
        this.cd.detectChanges();
        this.loadingData = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onProcessOrder(): void {
    this.router.navigate([`orders/${this.order.id}/generate-bill`]);
  }

  onGeneratePdf(): void {
    this.orderService.downloadPdf(this.order.id).subscribe(
      (res: any) => {
        const pdfTitle = res.headers.get('content-disposition').split('filename=').pop().replaceAll('"', '');
        const pdfContent = new Blob([res.body], { type: 'application/pdf' });

        this.pdfViewerOnDemand.downloadFileName = pdfTitle;
        this.pdfViewerOnDemand.pdfSrc = pdfContent;
        this.pdfViewerOnDemand.refresh();
    
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteProductOrder(prod: ProductOrder): Promise<void> {
    const confirm = await this.confirmDialog.show('Are you sure you want to <b>delete</b> the selected back-ordered product?');
    if (confirm) {
      this.productOrderService.delete(prod.id).subscribe(
        (res: any) => {
          this.ngOnInit();
          this.toast.show(EToastSeverities.SUCCESS, 'BO-product deleted');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
