import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialsmanuComponent } from './add-materialsmanu.component';

describe('AddMaterialsmanuComponent', () => {
  let component: AddMaterialsmanuComponent;
  let fixture: ComponentFixture<AddMaterialsmanuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaterialsmanuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialsmanuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
