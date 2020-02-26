import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributerListComponent } from './distributer-list.component';

describe('DistributerListComponent', () => {
  let component: DistributerListComponent;
  let fixture: ComponentFixture<DistributerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
