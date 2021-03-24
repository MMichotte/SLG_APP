import { OrderProcessComponent } from './pages/order-process/order-process.component';
import { CartDetailComponent } from './pages/cart-detail/cart-detail.component';
import { OrdersComponent } from './pages/orders-list/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EUserRoles } from '../../core/enums/user-roles.enum';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id/cart',
    component: CartDetailComponent
  },
  {
    path: ':id/detail',
    component: OrderDetailComponent
  },
  {
    path: ':id/generate-bill',
    component: OrderProcessComponent,
    data: { role: [EUserRoles.DEV, EUserRoles.ADMIN, EUserRoles.USER] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
