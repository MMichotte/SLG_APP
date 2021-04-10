import { NewCartFormComponent } from '../../components/new-cart-form/new-cart-form.component';
import { EOrderStatus } from './../../enums/order-status.enum';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { AuthService } from '@core/services/auth.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { tableSort } from '@core/helpers/table-sort';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './../common-style.scss', './orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public tableSort = tableSort;
  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;

  cols: any[];
  commonCart = { id: 0, supplier: 'Common' };
  carts: Order[] = [];
  orders: Order[] = [];
  selectedOrder: Order;
  loadingData: boolean;

  constructor(
    public readonly auth: AuthService,
    private readonly orderService: OrderService,
    private readonly toast: ToastService,
    public readonly dialogService: DialogService,
    private readonly confirmDialog: ConfirmDialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.refreshOrders();
    this.cols = [
      { field: 'id', header: 'Id', width: '8%' },
      { field: 'supplierName', header: 'Supplier', width: '30%' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Created at' },
      { field: 'updatedAt', header: 'Last updated' }
    ];
  }

  refreshOrders(): void {
    this.loadingData = true;
    this.orderService.getAll().subscribe(
      (orders: Order[]) => {
        orders = orders.map(o => {
          o.supplierName = o.supplier.name;
          o.createdAt = (new Date(o.createdAt)).toLocaleDateString();
          o.updatedAt = (new Date(o.updatedAt)).toLocaleDateString();
          return o;
        });
        this.carts = orders.filter(o => o.status === EOrderStatus.OPEN);
        this.orders = orders.filter(o => o.status !== EOrderStatus.OPEN);
        this.selectedOrder = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  onNewCart(): void {
    const ref = this.dialogService.open(NewCartFormComponent, {
      header: 'New Cart',
      width: '30%'
    });
    ref.onClose.subscribe((order?: any) => {
      if (order?.id) this.router.navigate([`orders/${order.id}/cart`]);
    });
  }

  showOrderPage(order: Order | any): void {
    this.router.navigate([`orders/${order.id}/cart`]);
  }

  showOrderDetailPage(order: Order): void {
    this.router.navigate([`orders/${order.id}/detail`]);
  }

  async deleteOrder(order: Order): Promise<void> {
    const item: string = (order.status === EOrderStatus.OPEN) ? 'cart' : 'order';
    this.selectedOrder = order;
    const confirm = await this.confirmDialog.show(`Are you sure you want to delete the selected ${item}?<br><br>This action can not be undone and will automatically remove all products of this ${item}!`);
    if (confirm) {
      this.orderService.delete(order.id).subscribe(
        (res: any) => {
          this.refreshOrders();
          this.toast.show(EToastSeverities.SUCCESS, `${item} deleted`);
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, `An error occurred. The ${item} was not deleted`);
        }
      );
    }
  }
}
