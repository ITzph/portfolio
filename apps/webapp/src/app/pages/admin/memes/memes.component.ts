import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../../memes/memes.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'portfolio-admin-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemesComponent implements OnInit {
  constructor(private readonly memesService: MemesService) {}

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
}
