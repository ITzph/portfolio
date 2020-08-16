import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BinaryConfirmationParams } from '../model/dialog.model';

@Component({
  selector: 'portfolio-binary-confirmation',
  templateUrl: './binary-confirmation.component.html',
  styleUrls: ['./binary-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinaryConfirmationComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<BinaryConfirmationComponent, boolean>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: BinaryConfirmationParams,
  ) {}

  public data: BinaryConfirmationParams;

  ngOnInit(): void {
    this.data = this.dialogData
      ? this.dialogData
      : {
          messages: ['Are you sure?'],
          noLabel: 'No',
          okayLabel: 'Okay',
          title: 'Confirmation',
        };
  }

  onOkayHandler() {
    this.dialogRef.close(true);
  }

  onNoHandler() {
    this.dialogRef.close(false);
  }
}
