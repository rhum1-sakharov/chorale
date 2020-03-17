/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiversService } from './divers.service';

describe('DiversService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiversService]
    });
  });

  it('should ...', inject([DiversService], (service: DiversService) => {
    expect(service).toBeTruthy();
  }));
});
