import { TestBed, inject } from '@angular/core/testing';

import { BowlingResolveService } from './bowling-resolve.service';

describe('BowlingResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BowlingResolveService]
    });
  });

  it('should be created', inject([BowlingResolveService], (service: BowlingResolveService) => {
    expect(service).toBeTruthy();
  }));
});
