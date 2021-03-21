import { NewOrderFormComponent } from './../../components/new-order-form/new-order-form.component';
import { EOrderStatus } from './../../enums/order-status.enum';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./../../../style.scss', './../common-style.scss', './orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;

  cols: any[];
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
        this.orders = orders.map(o => {
          o.supplierName = o.supplier.name;
          o.createdAt = (new Date(o.createdAt)).toLocaleDateString();
          o.updatedAt = (new Date(o.updatedAt)).toLocaleDateString();
          return o;
        });
        this.selectedOrder = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showNewOrderPage(): void {
    const ref = this.dialogService.open(NewOrderFormComponent, {
      header: 'Select Supplier',
      width: '30%'
    });
    ref.onClose.subscribe((orderId?: boolean) => {
      if (orderId) this.router.navigate([`orders/${orderId}/detail`]);
    });
  }

  showOrderPage(order: Order): void {
    this.router.navigate([`orders/${order.id}/detail`]);
  }

  async deleteOrder(order: Order): Promise<void> {
    this.selectedOrder = order;
    const confirm = await this.confirmDialog.show('Are you sure you want to delete the selected order?<br><br>This action can not be undone and will automatically remove all products of this order!');
    if (confirm) {
      this.orderService.delete(order.id).subscribe(
        (res: any) => {
          this.refreshOrders();
          this.toast.show(EToastSeverities.SUCCESS, 'Order deleted');
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The order was not deleted');
        }
      );
    }
  }
}
