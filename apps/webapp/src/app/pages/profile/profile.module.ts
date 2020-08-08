import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { AutoTyperComponent } from './auto-typer/auto-typer.component';
import { GreetingsTranscriptComponent } from './greetings-transcript/greetings-transcript.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [ProfileComponent, AutoTyperComponent, GreetingsTranscriptComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
  exports: [ProfileComponent, AutoTyperComponent, GreetingsTranscriptComponent],
})
export class ProfileModule {}
