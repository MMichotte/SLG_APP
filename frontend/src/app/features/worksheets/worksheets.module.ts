import { WorksheetsComponent } from './pages/worksheets.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksheetsRoutingModule } from './worksheets-routing.module';

@NgModule({
  declarations: [WorksheetsComponent],
  imports: [
    CommonModule,
    WorksheetsRoutingModule
  ]
})
export class WorksheetsModule { }
