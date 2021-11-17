import { CarsComponent } from './pages/cars-list/cars.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsDetailComponent } from './pages/cars-detail/cars-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  },
  {
    path: ':id/detail',
    component: CarsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
