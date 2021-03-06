import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EToastSeverities } from 'src/app/core/enums/toast-severity.enum';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Workforce } from '../../models/workforce.model';
import { WorkforceService } from '../../services/workforce.service';

@Component({
  selector: 'app-workforce-form',
  templateUrl: './workforce-form.component.html',
  styleUrls: ['./workforce-form.component.scss']
})
export class WorkforceFormComponent implements OnInit {
  
  @Input() currentWorkforce?: Workforce;
  @Input() isUpdate?: boolean;

  @Output() refreshTable? = new EventEmitter<any>();

  constructor(
    private readonly workforceService: WorkforceService,
    private readonly toast: ToastService,
    private readonly confirmDialog: ConfirmDialogService,
    public ref: DynamicDialogRef
  ) { }

  workforceForm = new FormGroup({
    label: new FormControl('', Validators.required),
    priceHT: new FormControl(0, Validators.required),
    priceTTC: new FormControl(0, Validators.required),
    note: new FormControl('')
  });

  ngOnInit(): void {
  }

  ngOnChanges ():void {
    if (this.currentWorkforce) {
      for (const field in this.workforceForm.controls) {
        const control = this.workforceForm.get(field);
        control.setValue(this.currentWorkforce[field]);
      }
      this.workforceForm.enable();
    } else {
      this.workforceForm.disable();
      this._resetForm();
    }
  }

  submitForm (): void {
    const workforce: Workforce = this.workforceForm.value;
    if (this.isUpdate) {
      this.workforceService.update(this.currentWorkforce.id, workforce).subscribe(
        (res: any) => {
          this._resetForm();
          this.refreshTable.emit();
          this.toast.show(EToastSeverities.SUCCESS, 'Workforce updated');
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The workforce was not updated');
        }
      );
    } else {
      this.workforceService.create(workforce).subscribe(
        (res: any) => {
          this._resetForm();
          this.toast.show(EToastSeverities.SUCCESS, 'Workforce created');
          this.ref.close(res.id);
        },
        (error: any) => {
          console.log(error);
          this.toast.show(EToastSeverities.ERROR, 'An error occurred. The workforce was not created');
        }
      );
    }
  }

  async deleteWorkforce (): Promise<void> {
    if (this.currentWorkforce) {
      const confirm = await this.confirmDialog.show(`Are you sure you want to delete the following workforce:
            \n<b>${this.currentWorkforce.label}</b>`);

      if (confirm) {
        this.workforceService.delete(this.currentWorkforce.id).subscribe(
          (res: any) => { 
            this._resetForm();
            this.refreshTable.emit();
            this.toast.show(EToastSeverities.SUCCESS, 'Workforce deleted');
          },
          (error: any) => {
            console.log(error);
            this.toast.show(EToastSeverities.ERROR, 'An error occurred. The workforce was not deleted');
          }
        );
      }
    }
  }

  private _resetForm (): void {
    this.workforceForm.reset({
      label: '',
      priceHT: 0,
      priceTTC: 0,
      note: ' '
    });
  }

  onCancel(): void {
    this.currentWorkforce = null;
    this.ref.close();
  }

}
