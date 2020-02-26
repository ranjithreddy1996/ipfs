import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDamagedToManufactureComponent } from './distributer-damaged-to-manufacture.component';

describe('DistributerDamagedToManufactureComponent', () => {
  let component: DistributerDamagedToManufactureComponent;
  let fixture: ComponentFixture<DistributerDamagedToManufactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerDamagedToManufactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerDamagedToManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
