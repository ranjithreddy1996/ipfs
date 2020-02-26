import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDashboardComponent } from './distributer-dashboard.component';

describe('DistributerDashboardComponent', () => {
  let component: DistributerDashboardComponent;
  let fixture: ComponentFixture<DistributerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
