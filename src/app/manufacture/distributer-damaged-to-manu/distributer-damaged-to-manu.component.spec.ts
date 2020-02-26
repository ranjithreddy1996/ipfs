import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerDamagedToManuComponent } from './distributer-damaged-to-manu.component';

describe('DistributerDamagedToManuComponent', () => {
  let component: DistributerDamagedToManuComponent;
  let fixture: ComponentFixture<DistributerDamagedToManuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerDamagedToManuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerDamagedToManuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
