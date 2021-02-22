import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { BillingComponent } from './features/components/billing/billing.component';
import { CarsComponent } from './features/components/cars/cars.component';
import { ClientsComponent } from './features/components/clients/clients.component';
import { LoginComponent } from './features/components/login/login.component';
import { OrdersComponent } from './features/components/orders/orders.component';
import { ProductsComponent } from './features/components/products/products.component';
import { SuppliersComponent } from './features/components/suppliers/suppliers.component';
import { WorkforcesComponent } from './features/components/workforces/workforces.component';
import { WorksheetsComponent } from './features/components/worksheets/worksheets.component';

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
