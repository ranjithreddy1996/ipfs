import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDamagedFoamComponent } from './distributer-damaged-foam.component';

describe('DistributerDamagedFoamComponent', () => {
  let component: DistributerDamagedFoamComponent;
  let fixture: ComponentFixture<DistributerDamagedFoamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerDamagedFoamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerDamagedFoamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
