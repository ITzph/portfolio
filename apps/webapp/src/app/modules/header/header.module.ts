import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SocialModule } from '../social/social.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule, SocialModule, MatButtonModule, MatIconModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
