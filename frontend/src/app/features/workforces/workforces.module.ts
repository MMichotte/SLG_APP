import { WorkforcesComponent } from './pages/workforces.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkforcesRoutingModule } from './workforces-routing.module';

@NgModule({
  declarations: [WorkforcesComponent],
  imports: [
    CommonModule,
    WorkforcesRoutingModule
  ]
})
export class WorkforcesModule { }
