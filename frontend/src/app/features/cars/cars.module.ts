import { CarsComponent } from './pages/cars-list/cars.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsDetailComponent } from './pages/cars-detail/cars-detail.component';
import { ModelManagerComponent } from './pages/model-manager/model-manager.component';
import { CarService } from './services/car.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { SharedModule } from '@shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CalendarModule } from 'primeng/calendar';
import { CompaniesModule } from '@features/companies/companies.module';
import { PersonsModule } from '@features/persons/persons.module';

@NgModule({
  declarations: [
    CarsComponent,
    CarsDetailComponent,
    ModelManagerComponent,
    CarFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    CalendarModule,
    AutoCompleteModule,
    InputNumberModule,
    InputTextareaModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    CarsRoutingModule
  ],
  providers: [
    CarService,
    DialogService,
    ToastService,
    ConfirmDialogService,
    DynamicDialogRef,
    DynamicDialogConfig
  ]
})
export class CarsModule { }
