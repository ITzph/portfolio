import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByTagComponent } from './filter-by-property/filter-by-property.component';
import { SortByPropertyComponent } from './sort-by-property/sort-by-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [FilterByTagComponent, SortByPropertyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    TooltipModule,
  ],
  exports: [FilterByTagComponent, SortByPropertyComponent],
})
export class GroupingModule {}
