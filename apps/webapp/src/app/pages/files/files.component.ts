import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { FilesService } from './files.service';

@Component({
  selector: 'portfolio-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesViewerComponent implements OnInit {
  files$: Observable<IFileMetadata[]> = this.filesService.getAllPublicFiles();

  constructor(private readonly filesService: FilesService) {}

  ngOnInit(): void {}
}
