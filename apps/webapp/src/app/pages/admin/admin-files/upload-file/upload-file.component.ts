import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileFormData } from '../file.model';

@Component({
  selector: 'portfolio-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileComponent implements OnInit {
  fileUploadForm = this.fb.group({
    fileName: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    category: [''],
    key: [''],
    file: ['', [Validators.required]],
    fileSource: ['', [Validators.required]],
  });
  // TODO add regex validation ^[\w,\s-]+\.[A-Za-z]{3}$

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UploadFileComponent, FileFormData>,
  ) {}

  onFormSubmit() {
    if (this.fileUploadForm.valid) {
      const { description, fileName, fileSource, key, category } = this.fileUploadForm.value;
      this.dialogRef.close({
        description,
        fileName,
        fileSource,
        key,
        category,
      });
    }
  }

  ngOnInit(): void {}

  onImagePicked(event: Event): void {
    const target = event.target as HTMLInputElement;
    const fileSource = target.files[0];
    if (fileSource) {
      this.fileUploadForm.patchValue({
        fileName: target.files[0].name,
      });
      this.fileUploadForm.patchValue({
        fileSource,
      });
    }
  }
}
