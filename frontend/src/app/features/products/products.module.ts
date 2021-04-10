import { SharedModule } from '@shared/shared.module';
import { ToastService } from '@core/services/toast.service';
import { ProductsComponent } from './pages/products-list/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DynamicDialogModule, DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { StockUpdateFormComponent } from './components/stock-update-form/stock-update-form.component';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent, ProductDetailComponent, StockUpdateFormComponent],
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
    InputNumberModule,
    InputTextareaModule,
    PanelModule,
    DynamicDialogModule,
    ProductsRoutingModule
  ],
  providers: [ProductService, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig],
  exports: [ProductFormComponent]
})
export class ProductsModule { }
