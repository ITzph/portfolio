import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MemeFormData } from '../model/meme.model';

@Component({
  selector: 'portfolio-add-meme-dialog',
  templateUrl: './add-meme-dialog.component.html',
  styleUrls: ['./add-meme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMemeDialogComponent implements OnInit {
  imageObj: File;
  memeForm = this.fb.group({
    title: 'Default Title',
    description: 'Default  Description',
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddMemeDialogComponent, MemeFormData>,
  ) {}

  ngOnInit(): void {}

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  onUploadHandler() {
    const { description, title } = this.memeForm.value;
    this.dialogRef.close({
      description,
      title,
      image: this.imageObj,
    });
  }
}
