import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuRejComponent } from './manu-rej.component';

describe('ManuRejComponent', () => {
  let component: ManuRejComponent;
  let fixture: ComponentFixture<ManuRejComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuRejComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
