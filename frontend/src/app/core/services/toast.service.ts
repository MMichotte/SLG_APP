import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EToastSeverities } from '../enums/toast-severity.enum';

@Injectable()
export class ToastService {

  constructor (
    private readonly toast: MessageService
  ) {}

  show (type: EToastSeverities, message: string): void {
    this.toast.add({ key: 'global_toast', severity: type.toLowerCase(), summary: type, detail: message });
  }

}
