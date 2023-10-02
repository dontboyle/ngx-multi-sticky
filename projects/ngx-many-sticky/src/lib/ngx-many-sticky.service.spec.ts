import { TestBed } from '@angular/core/testing';

import { NgxManyStickyService } from './ngx-many-sticky.service';

describe('NgxManyStickyService', () => {
  let service: NgxManyStickyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxManyStickyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
