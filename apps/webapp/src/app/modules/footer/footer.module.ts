import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SocialModule } from '../social/social.module';
import { routes } from '../../routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, SocialModule, RouterModule.forChild(routes)],
  exports: [FooterComponent],
})
export class FooterModule {}
