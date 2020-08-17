import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocialHandlerComponent } from './social-handler/social-handler.component';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [FooterComponent, SocialHandlerComponent],
  imports: [CommonModule, AngularSvgIconModule.forRoot(), AppRoutingModule],
  exports: [FooterComponent, SocialHandlerComponent],
})
export class FooterModule {}
