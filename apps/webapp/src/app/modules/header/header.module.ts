import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SocialModule } from '../social/social.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule, SocialModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
