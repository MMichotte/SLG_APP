import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { BillingComponent } from './features/billing/billing.component';
import { CarsComponent } from './features/cars/cars.component';
import { ClientsComponent } from './features/clients/clients.component';
import { LoginComponent } from './features/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductsComponent } from './features/products/products.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { WorkforcesComponent } from './features/workforces/workforces.component';
import { WorksheetsComponent } from './features/worksheets/worksheets.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'workforce', component: WorkforcesComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'cars', component: CarsComponent, canActivate: [AuthGuard] },
  { path: 'worksheets', component: WorksheetsComponent, canActivate: [AuthGuard] },
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', component: SuppliersComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
