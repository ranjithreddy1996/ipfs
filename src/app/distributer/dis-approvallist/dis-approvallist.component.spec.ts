import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisApprovallistComponent } from './dis-approvallist.component';

describe('DisApprovallistComponent', () => {
  let component: DisApprovallistComponent;
  let fixture: ComponentFixture<DisApprovallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisApprovallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisApprovallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
