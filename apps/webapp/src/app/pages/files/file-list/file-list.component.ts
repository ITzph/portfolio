import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { FilesService } from '../files.service';

@Component({
  selector: 'portfolio-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit {
  @Input() fileList: IFileMetadata[] = [];

  readonly fileTypeIcon = {
    jpg: 'image',
    png: 'image',
    pdf: 'picture_as_pdf',
    txt: 'view_headline',
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

  constructor(private readonly filesService: FilesService) {}

  downloadFile(file: IFileMetadata) {
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

  ngOnInit(): void {}
}
