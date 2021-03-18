import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastService } from './services/toast.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [HttpClient, ToastService, MessageService, ConfirmationService]
})
export class CoreModule { }
