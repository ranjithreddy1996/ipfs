import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRejComponent } from './supplier-rej.component';

describe('SupplierRejComponent', () => {
  let component: SupplierRejComponent;
  let fixture: ComponentFixture<SupplierRejComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRejComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
