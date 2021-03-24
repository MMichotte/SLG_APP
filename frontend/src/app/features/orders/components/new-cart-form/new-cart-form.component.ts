import { Order } from './../../models/order.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';
import { ToastService } from '../../../../core/services/toast.service';
import { SuppliersController } from '../../../suppliers/controllers/suppliers-controller';
import { LightSupplier } from '../../../suppliers/models/light-supplier.model';
import { CreateOrderDTO } from '../../dto/create-order.dto';
import { OrderService } from '../../services/order.service';
import { EOrderStatus } from '../../enums/order-status.enum';

@Component({
  selector: 'app-new-cart-form',
  templateUrl: './new-cart-form.component.html',
  styleUrls: ['../../../form.scss', './new-cart-form.component.scss']
})
export class NewCartFormComponent implements OnInit {

  lightSuppliers: LightSupplier[];
  lightSuppliersFiltered: LightSupplier[];
  selectedLightSupplier: LightSupplier;

  constructor(
    public readonly router: Router,
    public readonly cd: ChangeDetectorRef,
    public ref: DynamicDialogRef,
    private readonly toast: ToastService,
    private readonly orderService: OrderService,
    private readonly suppliersController: SuppliersController
  ) {
    this.lightSuppliersFiltered = [];
  }

  ngOnInit(): void {
    this.getLightSuppliers();
  }

  getLightSuppliers(): void {
    this.suppliersController.getAllLights().subscribe(
      (lightSuppliers: LightSupplier[]) => {
        this.lightSuppliers = lightSuppliers;
        this.lightSuppliersFiltered = this.lightSuppliers;
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

  async onNewCartSave(): Promise<void> {
    // create cart/order
    const openOrders: Order[] = await this.orderService.getAllByStatus(EOrderStatus.OPEN).toPromise();
    const existingOpenOrder: Order = openOrders.find(o => o.supplier.id === this.selectedLightSupplier.id);
    if (existingOpenOrder) {
      this.ref.close({ id: existingOpenOrder.id, isNew: false });
      return;
    }
  
    const newOrder: CreateOrderDTO = new CreateOrderDTO();
    newOrder.supplierId = this.selectedLightSupplier.id;
    this.orderService.create(newOrder).subscribe(
      (order: any) => {
        const createdOrderId: number = order.id;
        if (createdOrderId) {
          this.toast.show(EToastSeverities.SUCCESS, 'Cart created');
          this.ref.close({ id: order.id, isNew: true });
        }
      },
      (error: any) => {
        console.log(error);
        if (error.status === 409) {
          this.toast.show(EToastSeverities.WARN, 'The cart was not created since it already exists!');
          this.ref.close();
        }
      }
    );
  }

}
