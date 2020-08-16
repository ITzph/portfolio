import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import * as fromProfile from '../../reducers/profile.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MemesComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
  ],
})
export class MemesModule {}
