import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { EOrderStatus } from '../../enums/order-status.enum';
import { EProductOrderStatus } from '../../enums/product-order-status.enum';
import { ProductOrder } from '../../models/product-order.model';
import { ProductOrderService } from '../../services/product-order.service';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./../../../style.scss', './../common-style.scss', './order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

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
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductOrderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cols = [
      { field: 'productDisplayName', header: 'Product', width: '25%' },
      { field: 'note', header: 'Note', width: '15%' },
      { field: 'status', header: 'Status' },
      { field: 'quantityOrdered', header: 'Quantity Ordered' },
      { field: 'quantityReceived', header: 'Quantity Received' },
      { field: 'updatedAt', header: 'Received At' },
      { field: '', header: 'Bill n°' }
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
          p.updatedAt = (new Date(p.updatedAt)).toLocaleDateString();
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

  deleteProductOrder(prod: ProductOrder): void {
    
  }

}
