import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuDamagedToSupllierComponent } from './manu-damaged-to-supllier.component';

describe('ManuDamagedToSupllierComponent', () => {
  let component: ManuDamagedToSupllierComponent;
  let fixture: ComponentFixture<ManuDamagedToSupllierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuDamagedToSupllierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuDamagedToSupllierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
