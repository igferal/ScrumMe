import { TestBed, inject } from '@angular/core/testing';

import { TravisService } from './travis.service';

describe('TravisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravisService]
    });
  });

  it('should ...', inject([TravisService], (service: TravisService) => {
    expect(service).toBeTruthy();
  }));
});
