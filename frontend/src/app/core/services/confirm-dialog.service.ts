import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable()
export class ConfirmDialogService {

  constructor (
    private confirmationService: ConfirmationService
  ) { }

  show (message: string, key: string = 'global_confirm', header: string = 'Delete Confirmation'): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-info-circle',
        accept: () => {
          return resolve(true);
        },
        reject: () => {
          return resolve(false);
        },
        key: key
      });
    });
  }

}
