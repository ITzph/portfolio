import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';

@Component({
  selector: 'portfolio-add-meme-dialog',
  templateUrl: './add-meme-dialog.component.html',
  styleUrls: ['./add-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemeDialogComponent implements OnInit {
  memeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddMemeDialogComponent, PhotoFormData>,
  ) {}

  ngOnInit(): void {}

  onImagePicked(event: Event): void {
    const fileSource = (event.target as HTMLInputElement).files[0];

    if (fileSource) {
      this.memeForm.patchValue({
        fileSource,
      });
    }
  }

  onUploadHandler() {
    if (this.memeForm.valid) {
      const { description, title, fileSource } = this.memeForm.value;
      this.dialogRef.close({
        description,
        title,
        fileSource,
      });
    }
  }
}
