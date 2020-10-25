import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';
import { ImageDialogAbstract } from '../image-dialog.abtract';

@Component({
  selector: 'portfolio-add-meme-dialog',
  templateUrl: './add-meme-dialog.component.html',
  styleUrls: ['./add-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemeDialogComponent extends ImageDialogAbstract implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  memeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
    tags: [[]],
  });

  get getForm() {
    return this.memeForm;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddMemeDialogComponent, PhotoFormData>,
  ) {
    super();
  }

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
      const { description, title, fileSource, tags } = this.memeForm.value;
      this.dialogRef.close({
        description,
        title,
        fileSource,
        tags,
      });
    }
  }
}
