import { TestBed } from '@angular/core/testing';

import { CarouselBannerService } from './carousel-banner.service';

describe('CarouselBannerService', () => {
  let service: CarouselBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarouselBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
