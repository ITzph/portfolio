import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';

@NgModule({
  declarations: [MemesComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
})
export class MemesModule {}
