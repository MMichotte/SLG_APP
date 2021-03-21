import { OrderProcessComponent } from './pages/order-process/order-process.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersComponent } from './pages/orders-list/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EUserRoles } from '../../core/enums/user-roles.enum';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id/detail',
    component: OrderDetailComponent
  },
  {
    path: ':id/processing',
    component: OrderProcessComponent,
    data: { role: [EUserRoles.DEV, EUserRoles.ADMIN, EUserRoles.USER] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
