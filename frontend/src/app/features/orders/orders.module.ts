import { ProductsModule } from '@features/products/products.module';
import { SuppliersModule } from '@features/suppliers/suppliers.module';
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
import { SharedModule } from '@shared/shared.module';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { PanelModule } from 'primeng/panel';
import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { NewCartFormComponent } from './components/new-cart-form/new-cart-form.component';
import { ProductOrderFormComponent } from './components/product-order-form/product-order-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OrderProcessComponent } from './pages/order-process/order-process.component';
import { ProductOrderService } from './services/product-order.service';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { BillingModule } from '@features/billing/billing.module';
import { ProductProcessFormComponent } from './components/product-process-form/product-process-form.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
  declarations: [
    OrdersComponent,
    CartDetailComponent,
    NewCartFormComponent,
    ProductOrderFormComponent,
    OrderProcessComponent,
    OrderDetailComponent,
    ProductProcessFormComponent
  ],
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
    ConfirmDialogModule,
    SuppliersModule,
    ProductsModule,
    BillingModule,
    PdfJsViewerModule
  ],
  providers: [
    OrderService,
    ProductOrderService,
    DialogService,
    ToastService,
    ConfirmDialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ]
})
export class OrdersModule { }
