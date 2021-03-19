import { EOrderStatus } from './../../enums/order-status.enum';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./../../../style.scss', './orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;

  cols: any[];
  orders: Order[] = [];
  selectedOrder: Order;
  loadingData: boolean;

  constructor (
    public readonly auth: AuthService,
    private readonly orderService: OrderService,
    public dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
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
    this.router.navigate(['orders/new']);
  }

  showOrderPage(order: Order): void {
    this.router.navigate([`orders/${order.id}/detail`]);
  }

  deleteOrder(order: Order):void {

  }
}
