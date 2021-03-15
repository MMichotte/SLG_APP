import { Address } from './../../../../core/models/address.model';
import { Country } from './../../../../core/models/country.model';
import { CountriesService } from './../../../../core/services/countries.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ClientService } from './../../services/client.service';
import { Client } from '../../models/client.model';
import { ECivility } from '../../enums/ECivility.enum';
import { enumToObjArray } from '../../../../core/helpers/enum-to-obj-array';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnChanges {

  @Input() currentClient?: Client;
  @Input() isUpdate?: boolean;

  @Output() refreshTable?= new EventEmitter<any>();

  public EUserRoles = EUserRoles;

  public ECivility = ECivility;
  civility: any[];
  countries: Country[];
  addressFormRequired: boolean = false;

  constructor(
    public readonly auth: AuthService,
    private readonly countriesService: CountriesService,
    private readonly clientService: ClientService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef
  ) {
    this.civility = enumToObjArray(this.ECivility);
  }

  clientForm = new FormGroup({
    civility: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null),
    mobile: new FormControl(null)
  });

  addressForm = new FormGroup({
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    streetAddress: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this._resetForms();
    if (this.currentClient) {
      for (const field in this.clientForm.controls) {
        const control = this.clientForm.get(field);
        control.setValue(this.currentClient[field]);
      }
      if (this.auth.hasMinAccess(EUserRoles.USER)) {
        this.clientForm.enable();
        this.addressForm.enable();
      }
    } else {
      this._resetForms();
      this.clientForm.disable();
      this.addressForm.disable();
      return;
    }
    if (this.currentClient.address) {
      for (const field in this.addressForm.controls) {
        const control = this.addressForm.get(field);
        control.setValue(this.currentClient.address[field]);
      }
      this.addressForm.patchValue({
        country: { name: this.currentClient.address.country }
      });
    }
  }

  async submitForm(): Promise<void> {
    const client: Client = this.clientForm.getRawValue();
    const address: any = this.addressForm.getRawValue();
    address.country = (address.country) ? address.country.name : null;
    client.address = (this.addressFormRequired) ? address : null;
    
    if (this.isUpdate) {
      // update
      this.clientService.update(this.currentClient.id, client).subscribe(
        (res: any) => {
          this._resetForms();
          this.refreshTable.emit();
          this.toast.show(EToastSeverities.SUCCESS, 'Client updated');
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A Client with this email already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The client was not created');
        }
      );
    } else {
      // create
      this.clientService.create(client).subscribe(
        (res: any) => {
          this._resetForms();
          this.toast.show(EToastSeverities.SUCCESS, 'Client created');
          this.ref.close(res.id);
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A Client with this email already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The client was not created');
        }
      );
    }
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
    for (const field in this.addressForm.controls) {
      const control = this.addressForm.get(field);
      control.setValidators((this.addressFormRequired) ? Validators.required : null);
      control.updateValueAndValidity();
    }
  }

  async deleteClient(): Promise<void> {
    if (this.currentClient) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following client:
      \n<b> ${this.currentClient.firstName} - ${this.currentClient.lastName}</b>`);

      if (confirm) {
        this.clientService.delete(this.currentClient.id).subscribe(
          (res: any) => {
            this._resetForms();
            this.refreshTable.emit();
            this.toast.show(EToastSeverities.SUCCESS, 'Client deleted');
          },
          (error: any) => {
            console.log(error);
            this.toast.show(EToastSeverities.ERROR, 'An error occurred. The client was not deleted');
          }
        );
      }
    }
  }

  private _resetForms(): void {
    this.clientForm.reset();
    this.addressForm.reset();
  }

  onCancel(): void {
    this.currentClient = null;
    this.ref.close();
  }
}
