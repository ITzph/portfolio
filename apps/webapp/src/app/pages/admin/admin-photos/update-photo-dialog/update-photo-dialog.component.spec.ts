import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminModule } from '../../admin.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UpdatePhotoDialogComponent } from './update-photo-dialog.component';

describe('UpdatePhotoDialogComponent', () => {
  let component: UpdatePhotoDialogComponent;
  let fixture: ComponentFixture<UpdatePhotoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
