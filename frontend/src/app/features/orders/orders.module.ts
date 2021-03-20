import { SuppliersModule } from './../suppliers/suppliers.module';
import { OrderService } from './services/order.service';
import { OrdersComponent } from './pages/orders-list/orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ToastService } from '../../core/services/toast.service';
import { PanelModule } from 'primeng/panel';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { NewOrderFormComponent } from './components/new-order-form/new-order-form.component';
import { ProductOrderFormComponent } from './components/product-order-form/product-order-form.component';

@NgModule({
  declarations: [OrdersComponent, OrderDetailComponent, NewOrderFormComponent, ProductOrderFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    AutoCompleteModule,
    InputNumberModule,
    InputTextareaModule,
    DynamicDialogModule,
    OrdersRoutingModule,
    SuppliersModule
  ],
  providers: [OrderService, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class OrdersModule { }
