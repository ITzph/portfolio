import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByTagComponent } from './filter-by-property/filter-by-property.component';
import { SortByPropertyComponent } from './sort-by-property/sort-by-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FilterByTagComponent, SortByPropertyComponent],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
  exports: [FilterByTagComponent, SortByPropertyComponent],
})
export class GroupingModule {}
