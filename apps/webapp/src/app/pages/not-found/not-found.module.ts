import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { LayoutModule } from '../../modules/layout/layout.module';
import { HeaderModule } from '../../modules/header/header.module';
import { FooterModule } from '../../modules/footer/footer.module';
import { MatIconModule } from '@angular/material/icon';
import { ContentNotFoundComponent } from './content-not-found/content-not-found.component';

@NgModule({
  declarations: [NotFoundComponent, ContentNotFoundComponent],
  imports: [CommonModule, LayoutModule, HeaderModule, FooterModule, MatIconModule],
  exports: [NotFoundComponent, ContentNotFoundComponent],
})
export class NotFoundModule {}
