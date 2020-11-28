import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialHandlerComponent } from './social-handler/social-handler.component';
import { StaticSocialHandlerComponent } from './static-social-handler/static-social-handler.component';

@NgModule({
  declarations: [SocialHandlerComponent, StaticSocialHandlerComponent],
  imports: [CommonModule],
  exports: [SocialHandlerComponent, StaticSocialHandlerComponent],
})
export class SocialModule {}
