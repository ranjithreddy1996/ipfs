import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuDamagedInFormComponent } from './manu-damaged-in-form.component';

describe('ManuDamagedInFormComponent', () => {
  let component: ManuDamagedInFormComponent;
  let fixture: ComponentFixture<ManuDamagedInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuDamagedInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuDamagedInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
