import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { EOrderStatus } from '../../enums/order-status.enum';
import { EProductOrderStatus } from '../../enums/product-order-status.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { ProductOrder } from '../../models/product-order.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductOrderService } from '../../services/product-order.service';

@Component({
  selector: 'app-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./../../../style.scss', './../common-style.scss', '../../../form.scss', './order-process.component.scss']
})
export class OrderProcessComponent implements OnInit {

  public EUserRoles = EUserRoles;
  public EOrderStatus = EOrderStatus;
  public EProductOrderStatus = EProductOrderStatus;

  order: Order;
  productOrders: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  loadingData: boolean;

  totalInvoiceAmount: number;

  billForm = new FormGroup({
    invoiceNumber: new FormControl(null),
    shippingFees: new FormControl(0.00, [Validators.required, Validators.min(0.00)]),
    debitedAmount: new FormControl(0.00, [Validators.required, Validators.min(0.00)]),
    note: new FormControl(null)
  });
 
  constructor(
    public readonly auth: AuthService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly orderService: OrderService,
    private readonly productOrderService: ProductOrderService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const orderId = this.route.snapshot.params.id;
      this.order = await this.orderService.getOne(orderId).toPromise();
      if (this.order.status !== EOrderStatus.ORDERED && this.order.status !== EOrderStatus.PD) {
        this.back();
      }
      this.getProducts();
    } catch (e) {
      console.log(e);
      this.router.navigate(['orders']);
    }
  }

  getProducts(): void {
    this.loadingData = true;
    this.productOrderService.getAllByOrderId(this.order.id).subscribe(
      (products: ProductOrder[]) => {
        this.productOrders = products.map((p: ProductOrder) => {
          p.productDisplayName = `${p.product.reference} - ${p.product.label}`;
          p.createdAt = (new Date(p.createdAt)).toLocaleDateString();
          p.updatedAt = (new Date(p.updatedAt)).toLocaleDateString();
          p.status = EProductOrderStatus.BO;
          return p;
        });
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  setProdQuantity(prod: ProductOrder, quant: number) {
    if (quant) {
      prod.quantityReceived = +quant;
      prod.status = EProductOrderStatus.RECEIVED;
    } else {
      prod.quantityReceived = null;
      prod.pcPurchasePriceHTAtDate = null;
      prod.status = EProductOrderStatus.BO;
    }
    this.calcPrice();
    
  }
  
  setProdInvPrice(prod: ProductOrder, price: number) {
    if (price) {
      prod.pcInvoicePrice = +price;
    } else {
      prod.pcInvoicePrice = null;
      prod.pcPurchasePriceHTAtDate = null;
    }
    this.calcPrice();
  }

  calcPrice(): void {
    const { shippingFees, debitedAmount } = this.billForm.value;
    const receivedProds = this.productOrders.filter((pO: ProductOrder) => pO.status === EProductOrderStatus.RECEIVED);
    this.totalInvoiceAmount = 0;
    if (debitedAmount && receivedProds.length) {
      receivedProds.forEach((pO: ProductOrder) => {
        this.totalInvoiceAmount += +pO.pcInvoicePrice * +pO.quantityReceived;
      });
      
      const rate = debitedAmount / (this.totalInvoiceAmount + shippingFees);
      
      const updatedProducts = this.productOrders.map((pO: ProductOrder) => {
        if (pO.status === EProductOrderStatus.RECEIVED) {
          if (shippingFees) {
            pO.pcPurchasePriceHTAtDate = +((pO.pcInvoicePrice + (pO.pcInvoicePrice / this.totalInvoiceAmount) * shippingFees) * rate).toFixed(2);
          } else {
            pO.pcPurchasePriceHTAtDate = +(pO.pcInvoicePrice * rate).toFixed(2);
          }
          if (isNaN(pO.pcPurchasePriceHTAtDate)) pO.pcPurchasePriceHTAtDate = null;
        }
        return pO;
      });

      this.productOrders = updatedProducts;
      this.cd.detectChanges();
    }

  }

  back(): void {
    this.router.navigate([`orders/${this.order.id}/detail`]);
  }

}
