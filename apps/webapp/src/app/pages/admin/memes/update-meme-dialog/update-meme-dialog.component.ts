import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';
import { ImageDialogAbstract } from '../image-dialog.abtract';

@Component({
  selector: 'portfolio-update-meme-dialog',
  templateUrl: './update-meme-dialog.component.html',
  styleUrls: ['./update-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateMemeDialogComponent extends ImageDialogAbstract implements OnInit {
  memeForm = this.fb.group({
    title: [this.data.title, [Validators.required, Validators.minLength(4)]],
    description: [this.data.description],
    tags: [this.data.tags],
  });

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UpdateMemeDialogComponent, Partial<PhotoFormData>>,
    @Inject(MAT_DIALOG_DATA) private data: PhotoFormData,
  ) {
    super();
  }

  ngOnInit(): void {}

  onUploadHandler() {
    if (this.memeForm.valid) {
      const { description, title, tags } = this.memeForm.value;
      this.dialogRef.close({
        description,
        title,
        tags,
      });
    }
  }
}
