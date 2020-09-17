import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './profile-header/header.component';
import { SocialModule } from '../social/social.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { routes } from '../../routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [HeaderComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    SocialModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  ],
  exports: [HeaderComponent, AdminHeaderComponent],
})
export class HeaderModule {}
