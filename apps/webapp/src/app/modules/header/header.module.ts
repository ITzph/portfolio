import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SocialModule } from '../social/social.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { routes } from '../../routes';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SocialModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
