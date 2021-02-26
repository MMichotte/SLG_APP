import { CarsComponent } from './pages/cars.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';

@NgModule({
  declarations: [CarsComponent],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})
export class CarsModule { }
