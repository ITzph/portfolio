import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AppRoutingModule } from '../../app-routing.module';
import { SocialModule } from '../social/social.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, AppRoutingModule, SocialModule],
  exports: [FooterComponent],
})
export class FooterModule {}
