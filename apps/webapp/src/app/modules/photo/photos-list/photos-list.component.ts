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
  filterKey: keyof IImageMetadata = 'tags';

  currentPage = 0;

  readonly PAGE_SIZE_LIMIT = 4;

  ngOnInit(): void {}

  get filteredMemes() {
    return !!this.filterValue
      ? this.memes.filter((meme) => {
          if (this.filterKey === 'tags') {
            return !!meme.tags.find((tag) => tag.includes(this.filterValue));
          } else {
            if (['title', 'description'].includes(this.filterKey)) {
              return (meme[this.filterKey] as string).includes(this.filterValue);
            }
          }
        })
      : this.memes;
  }

  onFilterChange(event: { key: keyof IImageMetadata; value: string }) {
    if (event) {
      this.filterValue = event?.value;
      this.filterKey = event?.key;
    }
  }

  constructor(private readonly memesService: MemesService) {}

  public memeTracker(index: number, meme: IImageMetadata) {
    return trackByIdOrIndex(index, meme);
  }

  public onPageChange(page: number) {
    this.currentPage = page;
    this.memesService.fetchPaginatedMemes();
  }
}
