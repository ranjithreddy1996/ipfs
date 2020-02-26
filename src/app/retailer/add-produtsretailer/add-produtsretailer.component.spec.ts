import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdutsretailerComponent } from './add-produtsretailer.component';

describe('AddProdutsretailerComponent', () => {
  let component: AddProdutsretailerComponent;
  let fixture: ComponentFixture<AddProdutsretailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProdutsretailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdutsretailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
