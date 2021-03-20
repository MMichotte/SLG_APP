import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';
import { ToastService } from '../../../../core/services/toast.service';
import { SuppliersController } from '../../../suppliers/controllers/suppliers-controller';
import { LightSupplier } from '../../../suppliers/models/light-supplier.model';
import { CreateOrderDTO } from '../../dto/create-order.dto';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['../../../form.scss', './new-order-form.component.scss']
})
export class NewOrderFormComponent implements OnInit {

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

  onNewOrderSave(): void {
    // create order
    const newOrder: CreateOrderDTO = new CreateOrderDTO();
    newOrder.supplierId = this.selectedLightSupplier.id;
    this.orderService.create(newOrder).subscribe(
      (order: any) => {
        const createdOrderId: number = order.id;
        if (createdOrderId) {
          this.toast.show(EToastSeverities.SUCCESS, 'Order created');
          this.ref.close(order.id);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
