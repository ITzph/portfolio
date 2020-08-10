import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocialHandlerComponent } from './social-handler/social-handler.component';

@NgModule({
  declarations: [FooterComponent, SocialHandlerComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot()],
  exports: [FooterComponent, SocialHandlerComponent],
})
export class FooterModule {}
