import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AuthService } from '@core/services/auth.service';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { Company } from '@features/companies/models/company.model';
import { SuppliersController } from '../../controllers/suppliers-controller';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { Client } from '@features/clients/models/client.model';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  @Input() currentSupplier?: Company;
  @Input() isUpdate?: boolean;
  @Input() personsList?: any[];

  @Output() refreshTable?= new EventEmitter<any>();

  public EUserRoles = EUserRoles;

  addressFormRequired: boolean = false;

  constructor(
    public readonly auth: AuthService,
    private readonly suppliersController: SuppliersController,
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
  }

  ngOnChanges(): void {
    this._resetForms();
    if (this.currentSupplier) {
      for (const field in this.companyForm.controls) {
        const control = this.companyForm.get(field);
        if (field === 'person' && this.currentSupplier.person) {
          const person = new Client(this.currentSupplier.person);
          control.setValue(person);
        } else {
          control.setValue(this.currentSupplier[field]);
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
    if (this.currentSupplier.address) {
      for (const field in this.addressForm.controls) {
        const control = this.addressForm.get(field);
        control.setValue(this.currentSupplier.address[field]);
      }
      this.addressForm.patchValue({
        country: { name: this.currentSupplier.address.country }
      });
      this.addressFormRequired = true;
    } else {
      this.addressFormRequired = false;
    }
  }

  async submitForm(): Promise<void> {
    const supplier: any = this.companyForm.getRawValue();
    const address: any = this.addressForm.getRawValue();
    address.country = (address.country) ? address.country.name : null;
    supplier.address = (this.addressFormRequired) ? address : null;
    if (supplier.person && supplier.person !== '') {
      supplier.personId = supplier.person.id; 
    } else {
      supplier.person = null;
    }
    if (this.isUpdate) {
      // update
      this.suppliersController.updateCompany(this.currentSupplier.id, supplier).subscribe(
        (res: any) => {
          this._resetForms();
          this.refreshTable.emit();
          this.toast.show(EToastSeverities.SUCCESS, 'Supplier updated');
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A Supplier with this email already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The supplier was not created');
        }
      );
    } else {
      // create
      this.suppliersController.createCompany(supplier).subscribe(
        (res: any) => {
          this._resetForms();
          this.toast.show(EToastSeverities.SUCCESS, 'Supplier created');
          this.ref.close(res.id);
        },
        (error: any) => {
          console.log(error);
          if (error.status === 409) this.toast.show(EToastSeverities.ERROR, 'A Supplier with this email already exists!');
          else this.toast.show(EToastSeverities.ERROR, 'An error occurred. The supplier was not created');
        }
      );
    }

  }

  async deleteSupplier(): Promise<void> {
    if (this.currentSupplier) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following supplier:
      \n<b> ${this.currentSupplier.name}</b>`);

      if (confirm) {
        this.suppliersController.delete(this.currentSupplier.id).subscribe(
          (res: any) => {
            this._resetForms();
            this.refreshTable.emit();
            this.toast.show(EToastSeverities.SUCCESS, 'Supplier deleted');
          },
          (error: any) => {
            console.log(error);
            this.toast.show(EToastSeverities.ERROR, 'An error occurred. The supplier was not deleted');
          }
        );
      }
    }
  }

  private _resetForms(): void {
    this.companyForm.reset();
    this.addressForm.reset();
  }

  private _enableForms(): void {
    this.companyForm.enable();
    this.addressForm.enable();
  }
  
  private _disableForms(): void {
    this.companyForm.disable();
    this.addressForm.disable();
  }

  onCancel(): void {
    this.currentSupplier = null;
    this.ref.close();
  }
}
