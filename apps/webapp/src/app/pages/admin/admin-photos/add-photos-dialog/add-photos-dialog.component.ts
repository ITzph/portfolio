import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';
import { ImageDialogAbstract } from '../image-dialog.abtract';

@Component({
  selector: 'portfolio-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPhotoDialogComponent extends ImageDialogAbstract implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  photoForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
    tags: [[]],
  });

  get getForm() {
    return this.photoForm;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddPhotoDialogComponent, PhotoFormData>,
  ) {
    super();
  }

  ngOnInit(): void {}

  onImagePicked(event: Event): void {
    const fileSource = (event.target as HTMLInputElement).files[0];

    if (fileSource) {
      this.photoForm.patchValue({
        fileSource,
      });
    }
  }

  onUploadHandler() {
    if (this.photoForm.valid) {
      const { description, title, fileSource, tags } = this.photoForm.value;
      this.dialogRef.close({
        description,
        title,
        fileSource,
        tags,
      });
    }
  }
}
