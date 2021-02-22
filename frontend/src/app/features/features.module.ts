import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { WorkforcesComponent } from './components/workforces/workforces.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CarsComponent } from './components/cars/cars.component';
import { WorksheetsComponent } from './components/worksheets/worksheets.component';
import { BillingComponent } from './components/billing/billing.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    LoginComponent,
    ProductsComponent,
    WorkforcesComponent,
    ClientsComponent,
    CarsComponent,
    WorksheetsComponent,
    BillingComponent,
    SuppliersComponent,
    OrdersComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FeaturesModule { }
