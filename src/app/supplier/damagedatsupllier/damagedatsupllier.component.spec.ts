import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedatsupllierComponent } from './damagedatsupllier.component';

describe('DamagedatsupllierComponent', () => {
  let component: DamagedatsupllierComponent;
  let fixture: ComponentFixture<DamagedatsupllierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagedatsupllierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagedatsupllierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
