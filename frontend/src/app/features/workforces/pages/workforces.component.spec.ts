import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { WorkforceService } from '../services/workforce.service';

import { WorkforcesComponent } from './workforces.component';

describe('WorkforcesComponent', () => {
  let component: WorkforcesComponent;
  let fixture: ComponentFixture<WorkforcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        WorkforceService,
        DialogService,
        ToastService,
        ConfirmDialogService,
        DynamicDialogRef,
        DynamicDialogConfig
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [WorkforcesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkforcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
