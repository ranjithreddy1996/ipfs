import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupRejectedComponent } from './sup-rejected.component';

describe('SupRejectedComponent', () => {
  let component: SupRejectedComponent;
  let fixture: ComponentFixture<SupRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
