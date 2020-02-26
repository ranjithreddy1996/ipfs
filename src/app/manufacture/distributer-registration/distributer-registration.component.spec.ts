import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerRegistrationComponent } from './distributer-registration.component';

describe('DistributerRegistrationComponent', () => {
  let component: DistributerRegistrationComponent;
  let fixture: ComponentFixture<DistributerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
