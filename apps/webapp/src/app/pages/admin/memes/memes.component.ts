import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../../memes/memes.service';
import { environment } from '../../../../environments/environment';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { MemeFormData } from '../../memes/model/meme.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UpdateMemeDialogComponent } from './update-meme-dialog/update-meme-dialog.component';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';

@Component({
  selector: 'portfolio-admin-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMemesComponent implements OnInit {
  constructor(
    private readonly memesService: MemesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {}

  public get memes$() {
    return this.memesService.getMemes$().pipe(
      map((memes) => {
        return memes.map(
          (meme): IImageMetadata => {
            return {
              ...meme,
              url: `${environment.api}/memes/image/${meme.imageName}`,
            };
          },
        );
      }),
    );
  }

  public onAddNewMeme() {
    const dialogRef = this.dialog.open(AddMemeDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onImageUpload(result);
      }
    });
  }

  public onUpdateMeme(meme: IImageMetadata) {
    const dialogRef = this.dialog.open(UpdateMemeDialogComponent, {
      data: meme,
    });

    dialogRef.afterClosed().subscribe((image: Partial<IImageMetadata>) => {
      if (image) {
        this.memesService.updateMeme(meme.id, image);
      }
    });
  }

  public memeTracker(index: number, meme: IImageMetadata) {
    return trackByIdOrIndex(index, meme);
  }

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

  private onImageUpload(formData: MemeFormData) {
    const imageForm = new FormData();
    imageForm.append('image', formData.fileSource);
    imageForm.append('caption', formData.description);
    imageForm.append('title', formData.title);
    this.spinner.show('memesSpinner');
    this.memesService
      .imageUpload(imageForm)
      .pipe(
        finalize(() => {
          this.spinner.hide('memesSpinner');
        }),
      )
      .subscribe((res) => {
        this.memesService.addMeme(res);
      });
  }
}
