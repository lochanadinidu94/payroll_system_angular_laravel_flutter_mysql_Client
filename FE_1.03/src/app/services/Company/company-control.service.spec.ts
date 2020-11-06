import { TestBed } from '@angular/core/testing';

import { CompanyControlService } from './company-control.service';

describe('CompanyControlService', () => {
  let service: CompanyControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
