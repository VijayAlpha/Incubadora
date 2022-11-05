/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonHttpClientServiceService } from './CommonHttpClientService.service';

describe('Service: CommonHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonHttpClientServiceService]
    });
  });

  it('should ...', inject([CommonHttpClientServiceService], (service: CommonHttpClientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
