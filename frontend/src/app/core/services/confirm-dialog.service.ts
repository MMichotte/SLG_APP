import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable()
export class ConfirmDialogService {

  constructor (
    private confirmationService: ConfirmationService
  ) { }

  show (message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        message: message,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          return resolve(true);
        },
        reject: () => {
          return resolve(false);
        },
        key: 'global_confirm'
      });
    });
  }

}
