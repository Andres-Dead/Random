import { TestBed } from '@angular/core/testing';

import { VacantService } from './vacant.service';

describe('VacantService', () => {
  let service: VacantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
