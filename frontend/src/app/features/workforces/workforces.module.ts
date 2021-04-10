import { WorkforcesComponent } from './pages/workforces.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkforcesRoutingModule } from './workforces-routing.module';
import { WorkforceFormComponent } from './components/workforce-form/workforce-form.component';
import { WorkforceService } from './services/workforce.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [WorkforcesComponent, WorkforceFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    InputTextareaModule,
    PanelModule,
    DynamicDialogModule,
    WorkforcesRoutingModule
  ],
  providers: [WorkforceService, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class WorkforcesModule { }
