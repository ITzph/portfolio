import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [PublicLayoutComponent],
  imports: [CommonModule, HeaderModule],
  exports: [PublicLayoutComponent],
})
export class LayoutModule {}
