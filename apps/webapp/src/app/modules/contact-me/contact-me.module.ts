import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactMeComponent } from './contact-me.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ContactMeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [ContactMeComponent],
})
export class ContactMeModule {}
