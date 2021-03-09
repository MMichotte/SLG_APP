import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products-list/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':id/info',
    component: ProductInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
