import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-meme-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoDetailComponent implements OnInit {
  @Input()
  meme: IImageMetadata;

  ngOnInit(): void {}
}
