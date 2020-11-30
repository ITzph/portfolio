import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './profile-header/header.component';
import { SocialModule } from '../social/social.module';
import { RouterModule } from '@angular/router';
import { routes } from '../../routes';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [HeaderComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    SocialModule,
    RouterModule.forChild(routes),
    AngularSvgIconModule,
    ButtonModule,
    ConfirmDialogModule,
    MatSnackBarModule, // TODO remove this
    ToastModule,
  ],
  exports: [HeaderComponent, AdminHeaderComponent, AngularSvgIconModule],
  providers: [ConfirmationService, MessageService],
})
export class HeaderModule {}
