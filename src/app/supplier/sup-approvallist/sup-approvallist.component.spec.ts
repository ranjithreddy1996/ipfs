import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupApprovallistComponent } from './sup-approvallist.component';

describe('SupApprovallistComponent', () => {
  let component: SupApprovallistComponent;
  let fixture: ComponentFixture<SupApprovallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupApprovallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupApprovallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
