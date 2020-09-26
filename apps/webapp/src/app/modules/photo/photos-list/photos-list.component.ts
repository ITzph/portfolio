import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../../../pages/memes/memes.service';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { OrderByEventProp, ORDER, ORDER_BY } from '../photo.model';

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
  orderBy = ORDER_BY.CREATED_DATE;
  order = ORDER.DESC;

  currentPage = 0;

  readonly PAGE_SIZE_LIMIT = 20;

  ngOnInit(): void {}

  get filteredMemes() {
    const memes = !!this.filterValue
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

    const { order, orderBy } = this;
    return memes.sort((a, b) => {
      if (order === ORDER.ASC) {
        if (orderBy === ORDER_BY.DESCRIPTION || orderBy === ORDER_BY.TITLE) {
          return a[orderBy].localeCompare(b[orderBy]);
        } else if (orderBy === ORDER_BY.CREATED_DATE) {
          return new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime();
        }
      } else if (order === ORDER.DESC) {
        if (orderBy === ORDER_BY.DESCRIPTION || orderBy === ORDER_BY.TITLE) {
          return b[orderBy].localeCompare(a[orderBy]);
        } else if (orderBy === ORDER_BY.CREATED_DATE) {
          return new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
        }
      } else {
        throw { message: 'should not come to this point' };
      }
    });
  }

  onFilterChange(event: { key: keyof IImageMetadata; value: string }) {
    if (event) {
      this.filterValue = event?.value;
      this.filterKey = event?.key;
    }
  }

  onOrderChange(event: OrderByEventProp) {
    if (event) {
      this.order = event.order;
      this.orderBy = event.orderBy;
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
