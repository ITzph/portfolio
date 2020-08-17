import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-memes-list',
  templateUrl: './memes-list.component.html',
  styleUrls: ['./memes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemesListComponent implements OnInit {
  @Input()
  memes: IImageMetadata[];

  ngOnInit(): void {}

  public memeTracker(index: number, meme: IImageMetadata) {
    if (meme) {
      return meme.id;
    }

    return index;
  }
}
