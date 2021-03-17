import { ClientsComponent } from './pages/clients-list/clients.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { ToastService } from '../../core/services/toast.service';
import { SharedModule } from '../../shared/shared.module';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { CountriesService } from './../../core/services/countries.service';
import { PersonFormComponent } from './components/client-form/components/person-form/person-form.component';
import { CompanyFormComponent } from './components/client-form/components/company-form/company-form.component';
import { AddressFormComponent } from './components/client-form/components/address-form/address-form.component';
import { ClientsController } from './controllers/clients.controller';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailComponent,
    ClientFormComponent,
    PersonFormComponent,
    CompanyFormComponent,
    AddressFormComponent
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
    AutoCompleteModule,
    InputNumberModule,
    InputTextareaModule,
    PanelModule,
    DynamicDialogModule,
    ClientsRoutingModule
  ],
  providers: [ClientsController, CountriesService, DialogService, ToastService, ConfirmDialogService, DynamicDialogRef, DynamicDialogConfig]
})
export class ClientsModule { }
