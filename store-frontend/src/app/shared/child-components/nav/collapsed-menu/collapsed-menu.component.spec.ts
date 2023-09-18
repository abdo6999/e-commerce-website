import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsedMenuComponent } from './collapsed-menu.component';

describe('CollapsedMenuComponent', () => {
  let component: CollapsedMenuComponent;
  let fixture: ComponentFixture<CollapsedMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsedMenuComponent]
    });
    fixture = TestBed.createComponent(CollapsedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
