import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { FilesService } from '../files.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'portfolio-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit {
  @Input() fileList: IFileMetadata[] = [];

  readonly fileTypeIcon = {
    jpg: 'fa-image',
    png: 'fa-image',
    pdf: 'fa-file-pdf',
    txt: 'fa-file-alt',
    docx: 'fa-file-word',
  };

  get filesToDisplay(): (IFileMetadata & { fileType: string })[] {
    return (
      this.fileList?.map((file) => {
        const splittedFileName = file.fileName.split('.');

        return {
          ...file,
          fileType: splittedFileName[splittedFileName.length - 1],
        };
      }) ?? []
    );
  }

  displayedColumns: string[] = ['fileType', 'fileName', 'description', 'key'];

  constructor(
    private readonly filesService: FilesService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {}

  downloadFile(file: IFileMetadata) {
    if (isPlatformBrowser(this.platformId)) {
      this.filesService.getOneFile(file.key).subscribe((response: any) => {
        const filename = file.fileName;

        const dataType = response.type;
        if (filename) {
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
          downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      });
    }
  }

  ngOnInit(): void {}
}
