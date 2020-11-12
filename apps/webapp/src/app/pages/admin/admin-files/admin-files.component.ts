import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IFileMetadata } from '@portfolio/api-interfaces';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { trackByIdOrIndex } from '../../../utils/tracker-by-id.util';
import { FilesService } from '../../files/files.service';

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
    const currentFiles = this.filesToDisplay.getValue();
    this.filesToDisplay.next(currentFiles.filter((_file) => _file.id !== file.id));
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

  constructor(private readonly filesService: FilesService) {}

  ngOnInit(): void {
    this.initializeFileToDisplay();
  }
}
