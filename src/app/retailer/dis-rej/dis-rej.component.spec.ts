import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisRejComponent } from './dis-rej.component';

describe('DisRejComponent', () => {
  let component: DisRejComponent;
  let fixture: ComponentFixture<DisRejComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisRejComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
