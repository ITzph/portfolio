import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from '../../effects/profile.effects';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class ProfileModule {}
