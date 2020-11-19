import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IImageMetadata, API_ENDPOINTS } from '@portfolio/api-interfaces';
import { map } from 'rxjs/operators';
import { PhotosService } from './photos.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'portfolio-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private readonly photosService: PhotosService,
    private readonly authService: AuthService,
  ) {}

  get isLoggedIn$() {
    return this.authService.hasAuthToken();
  }

  public get photos$() {
    return this.photosService.getPhotos$().pipe(
      map((photos) => {
        return photos.map(
          (photo): IImageMetadata => {
            return {
              ...photo,
              url: `${environment.api}/${API_ENDPOINTS.photos}/image/${photo.imageName}`,
            };
          },
        );
      }),
    );
  }
}
