import { SuppliersController } from './controllers/suppliers-controller';
import { SuppliersComponent } from './pages/suppliers-list/suppliers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { SharedModule } from '@shared/shared.module';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierDetailComponent } from './pages/supplier-detail/supplier-detail.component';

@NgModule({
  declarations: [
    SuppliersComponent,
    SupplierFormComponent,
    SupplierDetailComponent
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
    AutoCompleteModule,
    InputTextareaModule,
    PanelModule,
    DynamicDialogModule,
    SuppliersRoutingModule
  ],
  providers: [SuppliersController, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class SuppliersModule { }
