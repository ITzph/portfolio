import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryConfirmationComponent } from './binary-confirmation.component';
import { CustomDialogModule } from '../custom-dialog.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('BinaryConfirmationComponent', () => {
  let component: BinaryConfirmationComponent;
  let fixture: ComponentFixture<BinaryConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
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
