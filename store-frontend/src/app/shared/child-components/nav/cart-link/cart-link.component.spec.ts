import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLinkComponent } from './cart-link.component';

describe('CartLinkComponent', () => {
  let component: CartLinkComponent;
  let fixture: ComponentFixture<CartLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartLinkComponent]
    });
    fixture = TestBed.createComponent(CartLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
