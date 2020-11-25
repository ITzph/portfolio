import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByTagComponent } from './filter-by-property/filter-by-property.component';
import { SortByPropertyComponent } from './sort-by-property/sort-by-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [FilterByTagComponent, SortByPropertyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ],
  exports: [FilterByTagComponent, SortByPropertyComponent],
})
export class GroupingModule {}
