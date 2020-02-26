import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerRegistrationComponent } from './officer-registration.component';

describe('OfficerRegistrationComponent', () => {
  let component: OfficerRegistrationComponent;
  let fixture: ComponentFixture<OfficerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
