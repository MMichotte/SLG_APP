import { BillSupplierService } from './services/bill-supplier.service';
import { BillingComponent } from './pages/billing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { BillSupplierComponent } from './components/bill-supplier/bill-supplier.component';
import { BillCustomerComponent } from './components/bill-customer/bill-customer.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { BillPdfComponent } from './components/bill-pdf/bill-pdf.component';

@NgModule({
  declarations: [
    BillingComponent,
    BillSupplierComponent,
    BillCustomerComponent,
    BillPdfComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    PanelModule,
    DynamicDialogModule,
    PdfJsViewerModule
  ],
  providers: [BillSupplierService, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig],
  exports: [
    BillPdfComponent
  ]
})
export class BillingModule { }
