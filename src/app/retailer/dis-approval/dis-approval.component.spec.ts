import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisApprovalComponent } from './dis-approval.component';

describe('DisApprovalComponent', () => {
  let component: DisApprovalComponent;
  let fixture: ComponentFixture<DisApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
