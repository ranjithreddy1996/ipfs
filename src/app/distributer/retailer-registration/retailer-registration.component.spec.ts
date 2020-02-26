import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRegistrationComponent } from './retailer-registration.component';

describe('RetailerRegistrationComponent', () => {
  let component: RetailerRegistrationComponent;
  let fixture: ComponentFixture<RetailerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
