import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGenderComponent } from './card-gender.component';

describe('CardGenderComponent', () => {
  let component: CardGenderComponent;
  let fixture: ComponentFixture<CardGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
