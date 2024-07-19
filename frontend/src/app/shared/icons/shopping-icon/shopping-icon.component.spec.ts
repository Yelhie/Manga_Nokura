import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingIconComponent } from './shopping-icon.component';

describe('ShoppingIconComponent', () => {
  let component: ShoppingIconComponent;
  let fixture: ComponentFixture<ShoppingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
