import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDamagedByRetailerComponent } from './distributer-damaged-by-retailer.component';

describe('DistributerDamagedByRetailerComponent', () => {
  let component: DistributerDamagedByRetailerComponent;
  let fixture: ComponentFixture<DistributerDamagedByRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerDamagedByRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerDamagedByRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
