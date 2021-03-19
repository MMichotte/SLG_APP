import { SuppliersComponent } from './pages/suppliers-list/suppliers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierDetailComponent } from './pages/supplier-detail/supplier-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SuppliersComponent
  },
  {
    path: ':id/detail',
    component: SupplierDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
