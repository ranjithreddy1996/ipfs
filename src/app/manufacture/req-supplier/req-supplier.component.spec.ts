import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqSupplierComponent } from './req-supplier.component';

describe('ReqSupplierComponent', () => {
  let component: ReqSupplierComponent;
  let fixture: ComponentFixture<ReqSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
