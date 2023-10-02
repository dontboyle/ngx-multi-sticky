import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxManyStickyDirective } from './ngx-many-sticky.directive';

describe('NgxManyStickyComponent', () => {
  let component: NgxManyStickyDirective;
  let fixture: ComponentFixture<NgxManyStickyDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxManyStickyDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxManyStickyDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
