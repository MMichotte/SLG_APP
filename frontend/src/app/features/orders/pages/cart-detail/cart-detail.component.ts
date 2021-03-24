import { UpdateProductOrderSimpleDTO } from './../../dto/update-product-order-simple.dto';
import { UpdateOrderDTO } from '../../dto/update-order.dto';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { EOrderStatus } from '../../enums/order-status.enum';
import { EProductOrderStatus } from '../../enums/product-order-status.enum';
import { ProductOrder } from '../../models/product-order.model';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';
import { ProductOrderService } from '../../services/product-order.service';
import { NewCartFormComponent } from '../../components/new-cart-form/new-cart-form.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./../../../style.scss', './../common-style.scss', './cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;
  public EProductOrderStatus = EProductOrderStatus;

  cols: any[];
  cartId: number;
  cart: Order;
  productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  selectedProductOrders: ProductOrder[] = [];
  loadingData: boolean;

  constructor(
    public readonly auth: AuthService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastService,
    public readonly dialogService: DialogService,
    private readonly confirmDialog: ConfirmDialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductOrderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cols = [
      { field: 'productDisplayName', header: 'Product', width: '25%' },
      { field: 'quantityOrdered', header: 'Quantity' },
      { field: 'note', header: 'Note', width: '30%' },
      { field: 'createdAt', header: 'Added at' },
      { field: 'updatedAt', header: 'Last updated at' }
    ];

    try {
      this.cartId = +this.route.snapshot.params.id;
      if (this.cartId !== 0) {
        this.cart = await this.orderService.getOne(this.cartId).toPromise();
      }
      this.refreshProducts();
    } catch (e) {
      console.log(e);
      this.router.navigate(['orders']);
    }
  }

  refreshProducts(): void {
    this.loadingData = true;
    this.productOrderService.getAllByOrderId(this.cartId).subscribe(
      (products: ProductOrder[]) => {
        this.productOrders = products.map((p: ProductOrder) => {
          p.productDisplayName = `${p.product.reference} - ${p.product.label}`;
          p.createdAt = (new Date(p.createdAt)).toLocaleDateString();
          p.updatedAt = (new Date(p.updatedAt)).toLocaleDateString();
          return p;
        });
        this.selectedProductOrders = [];
        this.cd.detectChanges();
        this.loadingData = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  async removeProduct(prod: ProductOrder): Promise<void> {
    this.selectedProductOrders = [];
    this.selectedProductOrders[0] = prod;
    const confirm = await this.confirmDialog.show('Are you sure you want to <b>delete</b> the selected product?');
    if (confirm) {
      this.productOrderService.delete(prod.id).subscribe(
        (res: any) => {
          this.refreshProducts();
          this.toast.show(EToastSeverities.SUCCESS, 'Product deleted');
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  async onGenerateOrder(): Promise<void> {
    const confirm = await this.confirmDialog.show('Do you wish to <b>place the order</b> or only <b>generate the PDF</b>?', 'local_confirm', 'Generate order');
    if (confirm) {
      // placing order
      this._placeOrder(this.cart.id);
    } else {
      // only generating pdf
    }
  }

  private _placeOrder(orderId: number): void {
    const updateOrder: UpdateOrderDTO = new UpdateOrderDTO();
    updateOrder.status = EOrderStatus.ORDERED;
    this.orderService.update(orderId, updateOrder).subscribe(
      (res: any) => {
        this.toast.show(EToastSeverities.SUCCESS, 'Order placed, status changed to Ordered');
        this.router.navigate([`orders/${orderId}/detail`]);
      }
    );
  }

  onGenerateNewOrder(): void {
    const ref = this.dialogService.open(NewCartFormComponent, {
      header: 'New Order',
      width: '30%'
    });
    ref.onClose.subscribe((order?: any) => {
      if (order.isNew) {
        this.selectedProductOrders.forEach(pO => {
          const updatePO: UpdateProductOrderSimpleDTO = new UpdateProductOrderSimpleDTO();
          updatePO.orderId = order.id;
          updatePO.note = pO.note;
          updatePO.quantityOrdered = pO.quantityOrdered;
          updatePO.status = pO.status;
          this.productOrderService.updateSimple(pO.id, updatePO).toPromise();
          this._placeOrder(order.id);
        });
      } else {

        this.router.navigate([`orders/${order.id}/cart`]);
      }
    });
  }

  setSelection(prod: ProductOrder): void {
    if (this.cartId === 0) {
      this.selectedProductOrder = (this.selectedProductOrders.length === 1) ? prod : null;
    } else {
      this.selectedProductOrders = [];
      this.selectedProductOrder = prod;
    }
    
  }

  onProcessOrder(): void {
    this.router.navigate([`orders/${this.cart.id}/generate-bill`]);
  }

}
