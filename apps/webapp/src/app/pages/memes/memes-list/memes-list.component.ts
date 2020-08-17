import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../memes.service';
import { MatDialog } from '@angular/material/dialog';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';

@Component({
  selector: 'portfolio-memes-list',
  templateUrl: './memes-list.component.html',
  styleUrls: ['./memes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemesListComponent implements OnInit {
  @Input()
  memes: IImageMetadata[];

  constructor(private readonly memesService: MemesService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  public onDeleteMeme(meme: IImageMetadata) {
    const dialogProp = {
      title: 'Delete Meme',
      messages: [`Are you sure you want to delete ${meme.title}?`],
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

  public memeTracker(index: number, meme: IImageMetadata) {
    if (meme) {
      return meme.id;
    }

    return index;
  }
}
