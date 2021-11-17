import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { enumToObjArray } from '@core/helpers/enum-to-obj-array';
import { AuthService } from '@core/services/auth.service';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { CreateCarDTO } from '@features/cars/dto/create-car.dto';
import { UpdateCarDTO } from '@features/cars/dto/update-car.dto';
import { EFuelType } from '@features/cars/enums/fuel-type.enum';
import { EOwnerType } from '@features/cars/enums/owner-type.enum';
import { CarModel } from '@features/cars/models/car-model.model';
import { Car } from '@features/cars/models/car.model';
import { Owner } from '@features/cars/models/owner.model';
import { CarService } from '@features/cars/services/car.service';
import { CompaniesService } from '@features/companies/services/companies.service';
import { PersonsService } from '@features/persons/services/persons.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./../../../../shared/styles/form.scss', './car-form.component.scss']
})
export class CarFormComponent implements OnInit, OnChanges {

  @Input() currentCar?: Car;
  @Input() isUpdate?: boolean;

  @Output() refreshTable?= new EventEmitter<any>();

  public EUserRoles = EUserRoles;
  public EFuelType = EFuelType;

  fuelTypes: any[];

  ownersList: Owner[] = [];
  ownersListFiltered: Owner[];

  carModelsList: CarModel[] = [];
  carModelsListFiltered: CarModel[];

  constructor(
    public readonly auth: AuthService,
    private readonly carService: CarService,
    private readonly personsService: PersonsService,
    private readonly companiesService: CompaniesService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef
  ) {
    this.fuelTypes = enumToObjArray(this.EFuelType);
  }

  carForm = new FormGroup({
    owner: new FormControl({ value: null, disabled: true }),
    model: new FormControl({ value: null, disabled: true }, Validators.required),
    version: new FormControl(null),
    color: new FormControl(null),
    fuelType: new FormControl(EFuelType.PETROL),
    bodywork: new FormControl(null),
    registrationNumber: new FormControl(null),
    chassisNumber: new FormControl(null, Validators.required),
    chassisNumberLocation: new FormControl(null),
    engineDisplacement: new FormControl(null),
    engineNumber: new FormControl(null),
    gearboxType: new FormControl(null),
    firstRegistration: new FormControl(null),
    note: new FormControl(null)
  });

  ngOnInit(): void {
    this.retrieveOwners();
    this.retrieveCarModels();
  }

  ngOnChanges(): void {
    if (this.currentCar) {
      for (const field in this.carForm.controls) {
        if (field === 'firstRegistration') continue;
        const control = this.carForm.get(field);
        control.setValue(this.currentCar[field]);
        this.carForm.enable();
      }
      
      if (this.currentCar.firstRegistration) {
        this.carForm.controls.firstRegistration.setValue(new Date(this.currentCar.firstRegistration));
      }

      this.ownersListFiltered = [this.ownersList.find(o => { return (o.id === this.currentCar.person?.id || o.id === this.currentCar.company?.id); })];
      if (this.ownersListFiltered.length) {
        this.carForm.controls.owner.setValue(this.ownersListFiltered[0]);
      }
      this.carModelsListFiltered = [this.carModelsList.find(o => { return (o.id === this.currentCar.model?.id); })];
      if (this.carModelsListFiltered.length) {
        this.carForm.controls.model.setValue(this.carModelsListFiltered[0]);
      }
    } else {
      this.carForm.disable();
      this._resetForm();
    }
  }

  retrieveOwners(): void {
    this.ownersList = [];
    this.personsService.getAllOwnersLight().subscribe(
      (owners: Owner[]) => {
        this.ownersList.push(...owners);
        this.carForm.get('owner').enable();
      }
    );
    this.companiesService.getAllClientsOwnersLight().subscribe(
      (owners: Owner[]) => {
        this.ownersList.push(...owners);
        this.carForm.get('model').enable();
      }
    );
  }

  retrieveCarModels(): void {
    this.carModelsList = [];
    this.carService.getAllModels().subscribe(
      (carModelsList: CarModel[]) => {
        carModelsList.map((carModel: CarModel) => {
          carModel.displayName = `${carModel.carMake.label} ${carModel.label}`;
          return carModelsList;
        });
        this.carModelsList = carModelsList;
      }
    );
  }

  searchOwner(input: string) {
    this.ownersListFiltered = this.ownersList.filter(
      (ol: any) => { return ol.displayName.toLowerCase().includes(input.toLowerCase()); }
    );
  }

  searchCarModel(input: string) {
    this.carModelsListFiltered = this.carModelsList.filter(
      (ol: any) => { return ol.displayName.toLowerCase().includes(input.toLowerCase()); }
    );
  }

  async submitForm(): Promise<void> {
    const formData = this.carForm.value;
    formData.modelId = formData.model.id;
    delete formData.model;
    formData.personId = null;
    formData.companyId = null;
    if (formData.owner) {
      if (formData.owner.type === EOwnerType.PERSON) {
        formData.personId = formData.owner.id;
      } else {
        formData.companyId = formData.owner.id;
      }
    }
    delete formData.owner;
    const car: CreateCarDTO = new CreateCarDTO(formData);

    if (this.isUpdate) {
      // update
      this.carService.update(this.currentCar.id, <UpdateCarDTO>car).subscribe(
        (res: any) => {
          this._resetForm();
          this.refreshTable.emit();
          this.toast.show(EToastSeverities.SUCCESS, 'Car updated');
        },
        (error: any) => {
          console.log(error);
          if (error.status === 401) this.toast.show(EToastSeverities.ERROR, error.error.message);
          else this.toast.show(EToastSeverities.ERROR, 'An unknown error occurred. The car was not updated');
        }
      );
    } else {
      // create
      this.carService.create(car).subscribe(
        (res: any) => {
          this._resetForm();
          this.toast.show(EToastSeverities.SUCCESS, 'Car created');
          this.ref.close(res.id);
        },
        (error: any) => {
          console.log(error);
          if (error.status === 401) this.toast.show(EToastSeverities.ERROR, error.error.message);
          else this.toast.show(EToastSeverities.ERROR, 'An unknown error occurred. The car was not created');
        }
      );
    }
  }

  async deleteCar(): Promise<void> {
    if (this.currentCar) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following car:
            \n<b> ${this.currentCar.makeLabel} ${this.currentCar.modelLabel} - ${this.currentCar.chassisNumber}</b>`);

      if (confirm) {
        this.carService.delete(this.currentCar.id).subscribe(
          (res: any) => {
            this._resetForm();
            this.refreshTable.emit();
            this.toast.show(EToastSeverities.SUCCESS, 'Car deleted');
          },
          (error: any) => {
            console.log(error);
            this.toast.show(EToastSeverities.ERROR, 'An error occurred. The car was not deleted');
          }
        );
      }
    }
  }

  private _resetForm(): void {
    this.carForm.reset({
      owner: null,
      model: null,
      version: null,
      color: null,
      fuelType: EFuelType.PETROL,
      bodywork: null,
      registrationNumber: null,
      chassisNumber: null,
      chassisNumberLocation: null,
      engineDisplacement: null,
      engineNumber: null,
      gearboxType: null,
      firstRegistration: null,
      note: null
    });
  }

  onCancel(): void {
    this.currentCar = null;
    this.ref.close();
  }

}
