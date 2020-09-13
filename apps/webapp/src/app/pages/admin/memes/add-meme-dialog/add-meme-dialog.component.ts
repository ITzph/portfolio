import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { PhotoFormData } from '../../../../modules/photo/model/photo.model';

@Component({
  selector: 'portfolio-add-meme-dialog',
  templateUrl: './add-meme-dialog.component.html',
  styleUrls: ['./add-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemeDialogComponent implements OnInit {
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
      const { description, title, fileSource, tags } = this.memeForm.value;
      this.dialogRef.close({
        description,
        title,
        fileSource,
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

  // TODO extract to common class
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
