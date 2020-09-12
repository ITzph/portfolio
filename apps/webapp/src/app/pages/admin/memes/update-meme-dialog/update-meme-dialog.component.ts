import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';

@Component({
  selector: 'portfolio-update-meme-dialog',
  templateUrl: './update-meme-dialog.component.html',
  styleUrls: ['./update-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateMemeDialogComponent implements OnInit {
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
  ) {}

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

  get tags() {
    return this.memeForm.get('tags');
  }

  removeTag(tag: string, index: number): void {
    if (index >= 0) {
      const tags: string[] = [...this.tags.value];
      const tagsSet = new Set(tags);
      tagsSet.delete(tag);
      this.tags.setValue(Array.from(tagsSet));
    }
  }

  addTag(event: MatChipInputEvent): void {
    const { value, input } = event;

    if ((value || '').trim()) {
      const tags: string[] = [...this.tags.value];
      // This is needed to avoid duplicate tag
      const tagsSet = new Set(tags);
      tagsSet.add(value.trim());
      this.tags.setValue(Array.from(tagsSet));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
