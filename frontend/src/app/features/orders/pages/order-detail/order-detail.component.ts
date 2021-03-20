import { UpdateOrderDTO } from './../../dto/update-order.dto';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { EOrderStatus } from '../../enums/order-status.enum';
import { EProductOrderStatus } from '../../enums/product-order-status.enum';
import { ProductOrder } from '../../models/product-order.model';
import { OrderService } from './../../services/order.service';
import { LightSupplier } from '../../../suppliers/models/light-supplier.model';
import { Order } from './../../models/order.model';
import { SuppliersController } from '../../../suppliers/controllers/suppliers-controller';
import { EToastSeverities } from 'src/app/core/enums/toast-severity.enum';

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

  lightSuppliers: LightSupplier[];
  lightSuppliersFiltered: LightSupplier[];
  selectedLightSupplier: LightSupplier;

  constructor(
    public readonly auth: AuthService,
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly orderService: OrderService,
    private readonly suppliersController: SuppliersController
  ) {
    this.lightSuppliersFiltered = [];
  }

  async ngOnInit(): Promise<void> {
    this.cols = [
      { field: 'id', header: 'Id', width: '8%' },
      { field: 'productDisplayName', header: 'Product', width: '30%' },
      { field: 'quantityOrdered', header: 'Quantity ordered' },
      { field: 'quantityReceived', header: 'Quantity received' },
      { field: 'status', header: 'Status' },
      { field: 'createdAt', header: 'Added at' }
    ];

    try {
      const orderId = this.route.snapshot.params.id;
      this.order = await this.orderService.getOne(orderId).toPromise();
      this.refreshProducts();
    } catch (e) {
      console.log(e);
      this.router.navigate(['orders']);
    }
    this.getLightSuppliers();
  }

  refreshProducts(): void {
    this.loadingData = true;
    this.orderService.getAllProductsByOrderId(this.order.id).subscribe(
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

  getLightSuppliers(): void {
    this.suppliersController.getAllLights().subscribe(
      (lightSuppliers: LightSupplier[]) => {
        this.lightSuppliers = lightSuppliers;
        this.lightSuppliersFiltered = this.lightSuppliers;
        this.selectedLightSupplier = this.lightSuppliers.find(lS => lS.id === this.order.supplier.id);
        this.cd.detectChanges();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  searchSupplier(input: string): void {
    this.lightSuppliersFiltered = this.lightSuppliers.filter(
      (lS: any) => { return lS.name.toLowerCase().includes(input.toLowerCase()); }
    );
  }

  async onChangeSupplier(): Promise<void> {
    const confirm = await this.confirmDialog.show('Are you sure you want to change the supplier for this order?');
    if (confirm) {
      const dto: UpdateOrderDTO = new UpdateOrderDTO();
      dto.supplierId = this.selectedLightSupplier.id;
      this.orderService.update(this.order.id, dto).subscribe(
        (res: any) => {
          this.toast.show(EToastSeverities.SUCCESS, 'Supplier updated');
        },
        (error: any) => {
          console.log(error);
          this.selectedLightSupplier = this.lightSuppliers.find(lS => lS.id === this.order.supplier.id);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The supplier was not updated');
        }
      );
    } else {
      this.selectedLightSupplier = this.lightSuppliers.find(lS => lS.id === this.order.supplier.id);
    }
  }

  async removeProduct(prod: ProductOrder): Promise<void> {
    this.selectedProductOrder = prod;
    const confirm = await this.confirmDialog.show('Are you sure you want to delete the selected product?');
    if (confirm) {
      this.orderService.removeProduct(this.order.id, prod.id).subscribe(
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

  print(): void {
    console.log(this.selectedProductOrder);
  }
}
