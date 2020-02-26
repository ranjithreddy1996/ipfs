import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNavComponent } from './transaction-nav.component';

describe('TransactionNavComponent', () => {
  let component: TransactionNavComponent;
  let fixture: ComponentFixture<TransactionNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
