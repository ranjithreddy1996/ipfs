import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuApprovalsComponent } from './manu-approvals.component';

describe('ManuApprovalsComponent', () => {
  let component: ManuApprovalsComponent;
  let fixture: ComponentFixture<ManuApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
