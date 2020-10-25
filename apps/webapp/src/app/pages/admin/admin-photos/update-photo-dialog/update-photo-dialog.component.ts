import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';
import { ImageDialogAbstract } from '../image-dialog.abtract';

@Component({
  selector: 'portfolio-update-photo-dialog',
  templateUrl: './update-photo-dialog.component.html',
  styleUrls: ['./update-photo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePhotoDialogComponent extends ImageDialogAbstract implements OnInit {
  photoForm = this.fb.group({
    title: [this.data.title, [Validators.required, Validators.minLength(4)]],
    description: [this.data.description],
    tags: [this.data.tags],
  });

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  get getForm() {
    return this.photoForm;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UpdatePhotoDialogComponent, Partial<PhotoFormData>>,
    @Inject(MAT_DIALOG_DATA) private data: PhotoFormData,
  ) {
    super();
  }

  ngOnInit(): void {}

  get isValueChanged() {
    const { description, title, tags } = this.photoForm.value;
    const isTagsTheSame =
      tags.length === this.data.tags.length &&
      tags.every((value, index) => value === this.data.tags[index]);

    const isValueChanged =
      description !== this.data.description || title !== this.data.title || !isTagsTheSame;

    return isValueChanged;
  }

  onUploadHandler() {
    if (this.photoForm.valid) {
      const { description, title, tags } = this.photoForm.value;

      if (this.isValueChanged) {
        this.dialogRef.close({
          description,
          title,
          tags,
        });
      }
    }
  }
}
