import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturndamagedatsupllierComponent } from './returndamagedatsupllier.component';

describe('ReturndamagedatsupllierComponent', () => {
  let component: ReturndamagedatsupllierComponent;
  let fixture: ComponentFixture<ReturndamagedatsupllierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturndamagedatsupllierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturndamagedatsupllierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
