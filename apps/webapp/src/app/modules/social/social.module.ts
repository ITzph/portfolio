import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialHandlerComponent } from './social-handler/social-handler.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [SocialHandlerComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  exports: [SocialHandlerComponent, AngularSvgIconModule],
})
export class SocialModule {}
