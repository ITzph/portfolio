import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryConfirmationComponent } from './binary-confirmation.component';

describe('BinaryConfirmationComponent', () => {
  let component: BinaryConfirmationComponent;
  let fixture: ComponentFixture<BinaryConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinaryConfirmationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
