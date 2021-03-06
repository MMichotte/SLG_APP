import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceFormComponent } from './workforce-form.component';

describe('WorkforceFormComponent', () => {
  let component: WorkforceFormComponent;
  let fixture: ComponentFixture<WorkforceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkforceFormComponent ]
    })
    .compileComponents();
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
