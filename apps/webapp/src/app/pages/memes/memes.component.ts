import { Component, OnInit } from '@angular/core';
import { MemesService } from './memes.service';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MemeFormData } from './model/meme.model';

@Component({
  selector: 'portfolio-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
})
export class MemesComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private readonly memesService: MemesService, public dialog: MatDialog) {}

  public onAddNewMeme() {
    const dialogRef = this.dialog.open(AddMemeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onImageUpload(result);
      }
    });
  }

  public get memes$() {
    return this.memesService.getMemes$();
  }

  public onDeleteMeme(meme: IImageMetadata) {
    this.memesService.deleteMeme(meme);
  }

  private onImageUpload(formData: MemeFormData) {
    const imageForm = new FormData();
    imageForm.append('image', formData.image);
    imageForm.append('caption', formData.description);
    imageForm.append('title', formData.title);
    this.memesService.imageUpload(imageForm).subscribe((res) => {
      this.memesService.addMeme(res);
    });
  }
}
