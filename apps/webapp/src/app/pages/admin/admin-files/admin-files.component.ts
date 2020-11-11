import { Component, OnInit } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesService } from '../../files/files.service';

@Component({
  selector: 'portfolio-admin-files',
  templateUrl: './admin-files.component.html',
  styleUrls: ['./admin-files.component.scss'],
})
export class AdminFilesComponent implements OnInit {
  filesToDisplay = [];
  displayedColumns: string[] = ['fileName', 'description', 'actions'];

  files$: Observable<IFileMetadata[]> = this.filesService.getAllFiles();

  constructor(private readonly filesService: FilesService) {}

  ngOnInit(): void {}
}
