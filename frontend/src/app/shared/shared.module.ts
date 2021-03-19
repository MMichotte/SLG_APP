import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { CompanyFormComponent } from './components/forms/company-form/company-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CountriesService } from '../core/services/countries.service';

@NgModule({
  declarations: [
    SpinnerComponent,
    SidenavComponent,
    CompanyFormComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextareaModule
  ],
  providers: [
    CountriesService
  ],
  exports: [
    SpinnerComponent,
    SidenavComponent,
    CompanyFormComponent,
    AddressFormComponent
  ]
})
export class SharedModule { }
