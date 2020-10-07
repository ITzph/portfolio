import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminModule } from '../../admin.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UpdateMemeDialogComponent } from './update-meme-dialog.component';

describe('UpdateMemeDialogComponent', () => {
  let component: UpdateMemeDialogComponent;
  let fixture: ComponentFixture<UpdateMemeDialogComponent>;

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
    fixture = TestBed.createComponent(UpdateMemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
