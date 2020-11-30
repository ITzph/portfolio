import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './profile-header/header.component';
import { SocialModule } from '../social/social.module';
import { RouterModule } from '@angular/router';
import { routes } from '../../routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HeaderComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    SocialModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    AngularSvgIconModule,
    ButtonModule,
  ],
  exports: [HeaderComponent, AdminHeaderComponent, AngularSvgIconModule],
})
export class HeaderModule {}
