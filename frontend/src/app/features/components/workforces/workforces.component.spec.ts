import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforcesComponent } from './workforces.component';

describe('WorkforcesComponent', () => {
  let component: WorkforcesComponent;
  let fixture: ComponentFixture<WorkforcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkforcesComponent ]
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
