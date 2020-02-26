import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisRejectedComponent } from './dis-rejected.component';

describe('DisRejectedComponent', () => {
  let component: DisRejectedComponent;
  let fixture: ComponentFixture<DisRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
