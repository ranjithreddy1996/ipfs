import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistRequestComponent } from './dist-request.component';

describe('DistRequestComponent', () => {
  let component: DistRequestComponent;
  let fixture: ComponentFixture<DistRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
