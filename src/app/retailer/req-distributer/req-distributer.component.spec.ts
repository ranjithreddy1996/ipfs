import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqDistributerComponent } from './req-distributer.component';

describe('ReqDistributerComponent', () => {
  let component: ReqDistributerComponent;
  let fixture: ComponentFixture<ReqDistributerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqDistributerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
