import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { AutoTyperComponent } from './auto-typer/auto-typer.component';
import { GreetingsTranscriptComponent } from './greetings-transcript/greetings-transcript.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { NotFoundModule } from '../not-found/not-found.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactMeModule } from '../../modules/contact-me/contact-me.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ProfileComponent, AutoTyperComponent, GreetingsTranscriptComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    NotFoundModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    ContactMeModule,
  ],
  exports: [ProfileComponent, AutoTyperComponent, GreetingsTranscriptComponent],
})
export class ProfileModule {}
