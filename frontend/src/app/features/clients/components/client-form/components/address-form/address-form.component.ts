import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ControlContainer, Validators } from '@angular/forms';
import { Country } from './../../../../../../core/models/country.model';
import { CountriesService } from './../../../../../../core/services/countries.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./../../client-form.component.scss', './address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  
  @Input() addressFormRequired: boolean;
  @Output() addressFormRequiredChange = new EventEmitter<boolean>();
  
  public addressForm: FormGroup;

  countries: Country[];

  constructor(
    private controlContainer: ControlContainer,
    private readonly countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line keyword-spacing
    this.addressForm = <FormGroup>this.controlContainer.control;
  }

  searchCountry(event: any): void {
    if (event) {
      if (event.query !== '') {
        this.countriesService.getByName(event.query).subscribe(
          (res: Country[]) => {
            this.countries = res;
          },
          (error: any) => {
            console.log(error);
          }
        );
        return;
      }
    }
    this.countriesService.getAll().subscribe(
      (res: Country[]) => {
        this.countries = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onAddressCompletion(): void {
    const addressFormData = this.addressForm.getRawValue();
    this.addressFormRequired = !Object.values(addressFormData).every(val => { return val === null || val === ''; });
    this.addressFormRequiredChange.emit(this.addressFormRequired);
    for (const field in this.addressForm.controls) {
      const control = this.addressForm.get(field);
      control.setValidators((this.addressFormRequired) ? Validators.required : null);
      control.updateValueAndValidity();
    }
  }

}
