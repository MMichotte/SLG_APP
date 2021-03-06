import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { WorkforceService } from './workforce.service';

describe('WorkforceService', () => {
  let service: WorkforceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkforceService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ]
    });
    service = TestBed.inject(WorkforceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
