import { TestBed, inject } from '@angular/core/testing';

import { BowlingService } from './bowling.service';

describe('BowlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BowlingService]
    });
  });

  it('should be created', inject([BowlingService], (service: BowlingService) => {
    expect(service).toBeTruthy();
  }));
});
