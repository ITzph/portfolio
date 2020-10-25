import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { PhotosService } from '../../../pages/photos/photos.service';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { OrderByEventProp, ORDER, ORDER_BY } from '../../grouping/grouping.model';

@Component({
  selector: 'portfolio-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosListComponent implements OnInit {
  @Input()
  photos: IImageMetadata[] = [];

  filterValue = '';
  filterKey: keyof IImageMetadata = 'tags';
  orderBy = ORDER_BY.CREATED_DATE;
  order = ORDER.DESC;

  currentPage = 0;

  readonly PAGE_SIZE_LIMIT = 20;

  ngOnInit(): void {}

  get filteredPhotos() {
    const photos = !!this.filterValue
      ? this.photos.filter((photo) => {
          if (this.filterKey === 'tags') {
            return !!photo.tags.find((tag) => tag.includes(this.filterValue));
          } else {
            if (['title', 'description'].includes(this.filterKey)) {
              return (photo[this.filterKey] as string).includes(this.filterValue);
            }
          }
        })
      : this.photos;

    const { order, orderBy } = this;
    return photos.sort((a, b) => {
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

  onResetFilter() {
    this.filterValue = '';
    this.filterKey = 'tags';
    this.orderBy = ORDER_BY.CREATED_DATE;
    this.order = ORDER.DESC;
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

  constructor(private readonly photosService: PhotosService) {}

  public photoTracker(index: number, photo: IImageMetadata) {
    return trackByIdOrIndex(index, photo);
  }

  public onPageChange(page: number) {
    this.currentPage = page;
    this.photosService.fetchPaginatedPhotos();
  }
}
