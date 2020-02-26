import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuApprovalComponent } from './manu-approval.component';

describe('ManuApprovalComponent', () => {
  let component: ManuApprovalComponent;
  let fixture: ComponentFixture<ManuApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
