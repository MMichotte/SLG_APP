import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { ToastService } from '../../../../core/services/toast.service';
import { EToastSeverities } from '../../../../core/enums/toast-severity.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { EUserRoles } from '../../../../core/enums/user-roles.enum';
import { ClientsController } from '../../controllers/clients.controller';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnChanges {

  @Input() currentClient?: Client;
  @Input() isUpdate?: boolean;
  @Input() personsList?: Client[];

  @Output() refreshTable?= new EventEmitter<any>();

  public EUserRoles = EUserRoles;

  isCompany: boolean = false;
  currentForm: FormGroup;
  addressFormRequired: boolean = false;

  constructor(
    public readonly auth: AuthService,
    private readonly clientsController: ClientsController,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    if (config.data?.personsList) {
      this.personsList = config.data.personsList;
    }
  }

  personForm = new FormGroup({
    civility: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null),
    mobile: new FormControl(null),
    VAT: new FormControl(null)
  });
  
  companyForm = new FormGroup({
    type: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    VAT: new FormControl(null),
    phone1: new FormControl(null),
    phone2: new FormControl(null),
    mobile: new FormControl(null),
    website: new FormControl(null),
    person: new FormControl(null)
  });

  addressForm = new FormGroup({
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    zipCode: new FormControl(null, Validators.required),
    streetAddress: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.currentForm = this.personForm;
  }

  ngOnChanges(): void {
    this._resetForms();
    this.isCompany = this.currentClient?.isCompany;
    this.currentForm = (this.isCompany) ? this.companyForm : this.personForm;

    if (this.currentClient) {
      for (const field in this.currentForm.controls) {
        const control = this.currentForm.get(field);
        if (field === 'person' && this.currentClient.person) {
          const person = new Client(this.currentClient.person);
          control.setValue(person);
        } else {
          control.setValue(this.currentClient[field]);
        }
      }
      if (this.auth.hasMinAccess(EUserRoles.USER)) {
        this._enableForms();
      }
    } else {
      this._resetForms();
      this._disableForms();
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
      this.addressFormRequired = true;
    } else {
      this.addressFormRequired = false;
    }
    
  }

  async submitForm(): Promise<void> {
    const client: any = this.currentForm.getRawValue();
    const address: any = this.addressForm.getRawValue();
    address.country = (address.country) ? address.country.name : null;
    client.address = (this.addressFormRequired) ? address : null;
    if (client.person) {
      client.personId = client.person.id; 
    }
    if (this.isUpdate) {
      // update
      const updateClient = (this.isCompany) ? 'updateCompany' : 'updatePerson';
      this.clientsController[updateClient](this.currentClient.id, client).subscribe(
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
      const createClient = (this.isCompany) ? 'createCompany' : 'createPerson';
      this.clientsController[createClient](client).subscribe(
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

  async deleteClient(): Promise<void> {
    if (this.currentClient) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following client:
      \n<b> ${this.currentClient.name}</b>`);

      if (confirm) {
        this.clientsController.delete(this.currentClient).subscribe(
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
    this.personForm.reset();
    this.companyForm.reset();
    this.addressForm.reset();
  }

  private _enableForms(): void {
    this.personForm.enable();
    this.companyForm.enable();
    this.addressForm.enable();
  }
  
  private _disableForms(): void {
    this.personForm.disable();
    this.companyForm.disable();
    this.addressForm.disable();
  }

  onSelectFormClick(): void {
    this.currentForm = (this.isCompany) ? this.companyForm : this.personForm;
  }

  onCancel(): void {
    this.currentClient = null;
    this.ref.close();
  }
}
