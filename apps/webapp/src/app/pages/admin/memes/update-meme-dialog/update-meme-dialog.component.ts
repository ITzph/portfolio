import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemeFormData } from '../../../memes/model/meme.model';

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
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UpdateMemeDialogComponent, Partial<MemeFormData>>,
    @Inject(MAT_DIALOG_DATA) private data: MemeFormData,
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
      const { description, title } = this.memeForm.value;
      this.dialogRef.close({
        description,
        title,
      });
    }
  }
}
