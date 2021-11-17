import { Component, OnInit } from '@angular/core';
import { EToastSeverities } from '@core/enums/toast-severity.enum';
import { EUserRoles } from '@core/enums/user-roles.enum';
import { AuthService } from '@core/services/auth.service';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { CreateCarMakeDTO } from '@features/cars/dto/create-car-make.dto';
import { CreateCarModelDTO } from '@features/cars/dto/create-car-model.dto';
import { CarMake } from '@features/cars/models/car-make.model';
import { CarModel } from '@features/cars/models/car-model.model';
import { CarMakeService } from '@features/cars/services/car-make.service';
import { CarModelService } from '@features/cars/services/car-model.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-model-manager-form',
  templateUrl: './model-manager-form.component.html',
  styleUrls: ['./../../../../shared/styles/form.scss', './model-manager-form.component.scss']
})
export class ModelManagerFormComponent implements OnInit {

  makeList: CarMake[];
  makeListFiltered: CarMake[];
  selectedMake: any;

  modelList: CarModel[];
  modelListFiltered: CarModel[];
  selectedModel: any;

  isExistingMake: boolean = false;
  isExistingModel: boolean = false;

  public EUserRoles = EUserRoles;

  constructor(
    public readonly auth: AuthService,
    private readonly carMakeService: CarMakeService,
    private readonly carModelService: CarModelService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.retrieveMakes();
    this.retrieveModels();
  }

  retrieveMakes(): void {
    this.makeList = [];
    this.carMakeService.getAll().subscribe(
      (makeList: CarMake[]) => {
        this.makeList = makeList;
        if (this.selectedMake) {
          this.searchMake(this.selectedMake);
        }
      }
    );
  }

  retrieveModels(): void {
    this.modelList = [];
    this.carModelService.getAll().subscribe(
      (modelList: CarModel[]) => {
        this.modelList = modelList;
        if (this.selectedModel) {
          this.searchModel(this.selectedModel);
        }
      }
    );
  }

  searchMake(input: string): void {
    this.makeListFiltered = this.makeList.filter(
      (ml: any) => { return ml.label.toLowerCase().includes(input.toLowerCase()); }
    );
    this.checkExistingMake();
  }

  checkExistingMake(): void {
    const currentMake = (this.selectedMake?.label) ? this.selectedMake?.label : this.selectedMake;
    if (this.makeList.find((ml) => { return ml.label === currentMake; })) {
      this.isExistingMake = true;
    } else {
      this.selectedModel = null;
      this.isExistingMake = false;
    }
  }

  addMake(): void {
    this.carMakeService.create(<CreateCarMakeDTO>{ label: this.selectedMake }).subscribe(
      (res: any) => {
        this.toast.show(EToastSeverities.SUCCESS, 'Make created');
        this.retrieveMakes();
      },
      (error: any) => {
        console.log(error);
        if (error.status === 401) this.toast.show(EToastSeverities.ERROR, error.error.message);
        else this.toast.show(EToastSeverities.ERROR, 'An unknown error occurred. The car was not created');
      }
    );
  }

  async deleteMake(): Promise<void> {
    const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following make:
    \n<b> ${this.selectedMake.label}</b>`);

    if (this.modelList.find((ml) => { return ml.carMake.id === this.selectedMake.id })) {
      this.toast.show(EToastSeverities.WARN, 'Unable to delete make, first delete all models');
      return;
    }

    if (confirm) {
      this.carMakeService.delete(this.selectedMake.id).subscribe(
        (res: any) => {
          this.selectedMake = null;
          this.retrieveMakes();
          this.toast.show(EToastSeverities.SUCCESS, 'Make deleted');
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The car was not deleted');
        }
      );
    }
  }

  searchModel(input: string): void {
    this.modelListFiltered = this.modelList.filter(
      (ml: CarModel) => { return (ml.label.toLowerCase().includes(input.toLowerCase()) && ml.carMake.id === this.selectedMake.id); }
    );
    this.checkExistingModel();
  }

  checkExistingModel(): void {
    const currentModel = (this.selectedModel?.label) ? this.selectedModel?.label : this.selectedModel;
    if (this.modelList.find((ml) => { return ml.label === currentModel; })) {
      this.isExistingModel = true;
    } else {
      this.isExistingModel = false;
    }
  }

  addModel(): void {
    this.carModelService.create(<CreateCarModelDTO>{ label: this.selectedModel, carMakeId: this.selectedMake.id }).subscribe(
      (res: any) => {
        this.retrieveModels();
        this.toast.show(EToastSeverities.SUCCESS, 'Model created');
      },
      (error: any) => {
        console.log(error);
        if (error.status === 401) this.toast.show(EToastSeverities.ERROR, error.error.message);
        else this.toast.show(EToastSeverities.ERROR, 'An unknown error occurred. The make was not created');
      }
    );
  }

  async deleteModel(): Promise<void> {
    const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following model:
    \n<b> ${this.selectedMake.label} ${this.selectedModel.label}</b>`);

    if (confirm) {
      this.carModelService.delete(this.selectedModel.id).subscribe(
        (res: any) => {
          this.selectedModel = null;
          this.retrieveModels();
          this.toast.show(EToastSeverities.SUCCESS, 'Model deleted');
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The model was not deleted');
        }
      );
    }
  }

  onClose(): void {
    this.ref.close();
  }

}
