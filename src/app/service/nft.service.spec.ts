/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NftService } from './nft.service';

describe('Service: Nft', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NftService]
    });
  });

  it('should ...', inject([NftService], (service: NftService) => {
    expect(service).toBeTruthy();
  }));
});
