import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../../../pages/memes/memes.service';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';

@Component({
  selector: 'portfolio-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosListComponent implements OnInit {
  @Input()
  memes: IImageMetadata[] = [];

  filterValue = '';

  currentPage = 0;

  readonly PAGE_SIZE_LIMIT = 4;

  ngOnInit(): void {}

  constructor(private readonly memesService: MemesService) {}

  public memeTracker(index: number, meme: IImageMetadata) {
    return trackByIdOrIndex(index, meme);
  }

  public onPageChange(page: number) {
    this.currentPage = page;
    this.memesService.fetchPaginatedMemes();
  }
}
