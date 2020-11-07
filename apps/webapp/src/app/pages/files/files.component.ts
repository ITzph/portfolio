import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'portfolio-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesViewerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
