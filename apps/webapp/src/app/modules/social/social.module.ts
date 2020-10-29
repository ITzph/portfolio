import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialHandlerComponent } from './social-handler/social-handler.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StaticSocialHandlerComponent } from './static-social-handler/static-social-handler.component';

@NgModule({
  declarations: [SocialHandlerComponent, StaticSocialHandlerComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  exports: [SocialHandlerComponent, AngularSvgIconModule, StaticSocialHandlerComponent],
})
export class SocialModule {}
