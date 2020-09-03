import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MatDialog } from '@angular/material/dialog';
import { map, tap, finalize } from 'rxjs/operators';
import { AddMemeDialogComponent } from './add-meme-dialog/add-meme-dialog.component';
import { MemeFormData } from './model/meme.model';
import { MemesService } from './memes.service';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'portfolio-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemesComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private readonly memesService: MemesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }

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
              url: `${environment.api}/memes/image/${meme.imageName}`,
            };
          },
        );
      }),
    );
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
