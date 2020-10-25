import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { map } from 'rxjs/operators';
import { MemesService } from './memes.service';
import { environment } from '../../../environments/environment';
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
    private readonly authService: AuthService,
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
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
}
