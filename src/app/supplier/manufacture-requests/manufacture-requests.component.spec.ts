import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureRequestsComponent } from './manufacture-requests.component';

describe('ManufactureRequestsComponent', () => {
  let component: ManufactureRequestsComponent;
  let fixture: ComponentFixture<ManufactureRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
