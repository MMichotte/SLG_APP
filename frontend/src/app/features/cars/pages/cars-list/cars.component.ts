
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { AuthService } from '@core/services/auth.service';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { CarFormComponent } from '@features/cars/components/car-form/car-form.component';
import { ModelManagerFormComponent } from '@features/cars/components/model-manager-form/model-manager-form.component';
import { EFuelType } from '@features/cars/enums/fuel-type.enum';
import { Car } from '@features/cars/models/car.model';
import { CarService } from '@features/cars/services/car.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './cars.component.scss']
})
export class CarsComponent implements OnInit {

  public EFuelType = EFuelType;
  public EUserRoles = EUserRoles;

  @ViewChild('carForm') carForm:CarFormComponent;

  cols: any[];
  cars: Car[];
  selectedCar: Car;
  loadingData: boolean;

  constructor(
    public readonly auth: AuthService,
    private readonly carService: CarService,
    private readonly toast: ToastService,
    public readonly dialogService: DialogService,
    private readonly confirmDialog: ConfirmDialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.refreshCars();
    this.cols = [
      { field: 'makeLabel', header: 'Make' },
      { field: 'modelLabel', header: 'Model' },
      { field: 'version', header: 'Version' },
      { field: 'owner', header: 'Owner' },
      { field: 'registrationNumber', header: 'Registration' },
      { field: 'chassisNumber', header: 'Chassis n°' },
      { field: 'firstRegistration', header: 'First Reg.' }
    ];
  }

  refreshCars(): void {
    this.loadingData = true;
    this.carService.getAll().subscribe(
      (cars: Car[]) => {
        cars.map((car: Car) => {
          car.makeLabel = car.model.carMake.label;
          car.modelLabel = car.model.label;
          car.owner = (car.person) ? `${car.person.firstName} ${car.person.lastName}` : car.company?.name;
          return car;
        });
        this.cars = cars;
        this.selectedCar = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showNewCarModal(): void {
    const ref = this.dialogService.open(CarFormComponent, {
      header: 'New Car',
      width: '60%'
    });
    ref.onClose.subscribe((carId?: boolean) => {
      if (carId) this.refreshCars();
    });
  }

  showCarInfoPage(car: Car): void {
    this.router.navigate([`cars/${car.id}/detail`]);
  }

  showManagementModal(): void {
    const ref = this.dialogService.open(ModelManagerFormComponent, {
      header: 'Mange Makes & Models',
      width: '40%'
    });
    ref.onClose.subscribe(() => {
      this.carForm.retrieveCarModels();
    });
  }

}
