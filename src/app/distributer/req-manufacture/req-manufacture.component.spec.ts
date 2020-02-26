import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqManufactureComponent } from './req-manufacture.component';

describe('ReqManufactureComponent', () => {
  let component: ReqManufactureComponent;
  let fixture: ComponentFixture<ReqManufactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqManufactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
