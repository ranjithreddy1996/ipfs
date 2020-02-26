import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsdisComponent } from './add-productsdis.component';

describe('AddProductsdisComponent', () => {
  let component: AddProductsdisComponent;
  let fixture: ComponentFixture<AddProductsdisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsdisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsdisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
