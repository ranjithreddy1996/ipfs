import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuRejectedComponent } from './manu-rejected.component';

describe('ManuRejectedComponent', () => {
  let component: ManuRejectedComponent;
  let fixture: ComponentFixture<ManuRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
