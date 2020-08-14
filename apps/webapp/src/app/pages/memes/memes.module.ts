import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import * as fromProfile from '../../reducers/profile.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MemesComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
})
export class MemesModule {}
