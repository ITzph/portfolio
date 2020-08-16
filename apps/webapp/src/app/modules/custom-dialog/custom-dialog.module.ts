import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BinaryConfirmationComponent } from './binary-confirmation/binary-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BinaryConfirmationComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [BinaryConfirmationComponent],
})
export class CustomDialogModule {}
