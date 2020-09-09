import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemesRoutingModule } from './memes-routing.module';
import { MemesComponent } from './memes.component';
import { StoreModule } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import * as fromProfile from '../../reducers/profile.reducer';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDialogModule } from '../../modules/custom-dialog/custom-dialog.module';
import { MemesListComponent } from './memes-list/memes-list.component';
import { MemeDetailComponent } from './meme-detail/meme-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';

@NgModule({
  declarations: [MemesComponent, MemesListComponent, MemeDetailComponent],
  imports: [
    CommonModule,
    MemesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    CustomDialogModule,
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    NgxSpinnerModule,
    NgxPaginationModule,
    LayoutModule,
    HeaderModule,
    FooterModule,
  ],
  exports: [MemesComponent, MemesListComponent, MemeDetailComponent],
})
export class MemesModule {}
