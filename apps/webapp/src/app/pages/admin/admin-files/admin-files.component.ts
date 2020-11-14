import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { FilesService } from '../../files/files.service';
import { FileFormData } from './file.model';
import { UploadFileComponent } from './upload-file/upload-file.component';

type EditableFile = IFileMetadata & { editable: boolean };

@Component({
  selector: 'portfolio-admin-files',
  templateUrl: './admin-files.component.html',
  styleUrls: ['./admin-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFilesComponent implements OnInit {
  displayedColumns: string[] = ['fileName', 'description', 'actions'];

  isEditing = false;

  files$: Observable<IFileMetadata[]> = this.filesService.getAllFiles();

  filesToDisplay: BehaviorSubject<EditableFile[]> = new BehaviorSubject([]);

  constructor(
    private readonly filesService: FilesService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService,
  ) {}

  onUploadNewFile() {
    const dialogRef = this.dialog.open(UploadFileComponent);

    dialogRef.afterClosed().subscribe((formData: FileFormData) => {
      if (formData) {
        const imageForm = new FormData();
        imageForm.append('fileName', formData.fileName);
        imageForm.append('description', formData.description);
        imageForm.append('category', formData.category);
        imageForm.append('key', formData.key);
        imageForm.append('file', formData.fileSource);
        this.spinner.show('photosSpinner');
        this.filesService
          .fileUpload(imageForm)
          .pipe(
            finalize(() => {
              this.spinner.hide('photosSpinner');
            }),
          )
          .subscribe((res) => {
            const currentFiles = this.filesToDisplay.getValue();
            this.filesToDisplay.next([
              {
                ...res,
                editable: false,
              },
              ...currentFiles,
            ]);
          });
      }
    });
  }

  initializeFileToDisplay() {
    this.files$
      .pipe(
        map((files) => {
          return files.map((file) => {
            return {
              ...file,
              editable: false,
            };
          });
        }),
        take(1),
      )
      .subscribe((files) => {
        this.filesToDisplay.next(files);
      });
  }

  onCancelEditing() {
    this.initializeFileToDisplay();
    this.isEditing = false;
  }

  onFileUpdateStarted(file: EditableFile) {
    const currentFiles = this.filesToDisplay.getValue();
    this.filesToDisplay.next(
      currentFiles.map((_file) => {
        if (_file.id === file.id) {
          this.isEditing = true;
          return {
            ...file,
            editable: true,
          };
        }

        return { ..._file, editable: false };
      }),
    );
  }

  fileTracker(index: number, file: EditableFile) {
    return trackByIdOrIndex(index, file);
  }

  onFileDeleteStarted(file: EditableFile) {
    const dialogProp = {
      title: 'Delete file',
      messages: [`Are you sure you want to delete ${file.fileName}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.filesService.deleteFile(file.id).subscribe(({ id }) => {
          const currentFiles = this.filesToDisplay.getValue();
          this.filesToDisplay.next(currentFiles.filter((_file) => _file.id !== id));
        });
      }
    });
  }

  onPropertyChange(file: EditableFile, event: Event, prop: keyof EditableFile) {
    const { value } = event.target as HTMLInputElement;

    const currentFiles = this.filesToDisplay.getValue();

    this.filesToDisplay.next(
      currentFiles.map((_file) => {
        if (_file.id === file.id) {
          return {
            ...file,
            [prop]: value,
          };
        }

        return { ..._file, editable: false };
      }),
    );
  }

  onConfirmUpdate(file: EditableFile) {
    const dialogProp = {
      title: 'Update file',
      messages: [`Are you sure you want to update ${file.fileName}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.filesService.updateFile(file.id, file).subscribe((updatedFile) => {
          const currentFiles = this.filesToDisplay.getValue();
          this.filesToDisplay.next(
            currentFiles.map((_file) => {
              if (_file.id === updatedFile.id) {
                this.isEditing = false;
                return {
                  ...file,
                  ...updatedFile,
                  editable: false,
                };
              }
              return { ..._file, editable: false };
            }),
          );
        });
      }
    });
  }

  ngOnInit(): void {
    this.initializeFileToDisplay();
  }
}
