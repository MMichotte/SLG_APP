import { SuppliersComponent } from './pages/suppliers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
