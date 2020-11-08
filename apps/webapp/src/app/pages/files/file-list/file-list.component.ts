import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit {
  @Input() fileList: IFileMetadata[];

  displayedColumns: string[] = ['fileName', 'description', 'url'];

  constructor() {}

  ngOnInit(): void {}
}
