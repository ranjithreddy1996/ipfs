import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToDistributerComponent } from './return-to-distributer.component';

describe('ReturnToDistributerComponent', () => {
  let component: ReturnToDistributerComponent;
  let fixture: ComponentFixture<ReturnToDistributerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToDistributerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
