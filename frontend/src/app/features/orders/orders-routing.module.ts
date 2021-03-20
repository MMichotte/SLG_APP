import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersComponent } from './pages/orders-list/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id/detail',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
