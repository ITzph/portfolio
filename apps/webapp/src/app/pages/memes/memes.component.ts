import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MemesService } from './memes.service';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MemeFormData } from './model/meme.model';
import { BinaryConfirmationComponent } from '../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'portfolio-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    return this.memesService.getMemes$().pipe(
      map((memes) => {
        return memes.map(
          (meme): IImageMetadata => {
            return {
              ...meme,
              url: 'api/memes/image/' + meme.imageName,
            };
          },
        );
      }),
    );
  }

  public onDeleteMeme(meme: IImageMetadata) {
    const dialogProp = {
      title: 'Delete Meme',
      messages: ['Are you sure you want to delete ' + meme.title],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.memesService.deleteMeme(meme);
      }
    });
  }

  private onImageUpload(formData: MemeFormData) {
    const imageForm = new FormData();
    imageForm.append('image', formData.fileSource);
    imageForm.append('caption', formData.description);
    imageForm.append('title', formData.title);
    this.memesService.imageUpload(imageForm).subscribe((res) => {
      this.memesService.addMeme(res);
    });
  }
}
