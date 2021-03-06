import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductsRoutingModule } from 'src/app/features/products/products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkforceService } from '../../services/workforce.service';

import { WorkforceFormComponent } from './workforce-form.component';

describe('WorkforceFormComponent', () => {
  let component: WorkforceFormComponent;
  let fixture: ComponentFixture<WorkforceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        WorkforceService,
        DialogService,
        ToastService,
        ConfirmDialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        MessageService,
        ConfirmationService
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SharedModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        InputNumberModule,
        InputTextareaModule,
        PanelModule,
        DynamicDialogModule,
        ProductsRoutingModule
      ],
      declarations: [WorkforceFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkforceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
