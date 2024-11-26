import { TestBed } from '@angular/core/testing';

import { CoctelesService } from './cocteles.service';

describe('CoctelesService', () => {
  let service: CoctelesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoctelesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
