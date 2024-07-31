import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGenderComponent } from './carousel-gender.component';

describe('CarouselGenderComponent', () => {
  let component: CarouselGenderComponent;
  let fixture: ComponentFixture<CarouselGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselGenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
