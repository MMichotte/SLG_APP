import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { WorkforcesComponent } from './workforces/workforces.component';
import { ClientsComponent } from './clients/clients.component';
import { CarsComponent } from './cars/cars.component';
import { WorksheetsComponent } from './worksheets/worksheets.component';
import { BillingComponent } from './billing/billing.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';

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
    OrdersComponent,
    UsersComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FeaturesModule { }
