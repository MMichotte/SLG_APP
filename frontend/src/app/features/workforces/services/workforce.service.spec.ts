import { TestBed } from '@angular/core/testing';

import { WorkforceService } from './workforce.service';

describe('WorkforceService', () => {
  let service: WorkforceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkforceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
