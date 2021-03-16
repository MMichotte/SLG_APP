import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from './../../core/services/countries.service';
import { PersonsService } from './services/persons.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PersonsService, CountriesService]
})
export class PersonsModule { }
