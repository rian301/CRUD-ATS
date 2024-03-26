/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UltilsService } from './ultils.service';

describe('Service: Ultils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UltilsService]
    });
  });

  it('should ...', inject([UltilsService], (service: UltilsService) => {
    expect(service).toBeTruthy();
  }));
});
