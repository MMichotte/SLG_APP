import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProductsRoutingModule } from '../../products-routing.module';
import { ProductService } from '../../services/product.service';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProductService,
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
      declarations: [ProductFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
