/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonToastrService } from './common-toastr.service';

describe('Service: CommonToastr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonToastrService]
    });
  });
  it('should ...', inject([CommonToastrService], (service: CommonToastrService) => {
    expect(service).toBeTruthy();
  }));
});
