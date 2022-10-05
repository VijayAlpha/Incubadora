import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NbCheckboxModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbCheckboxModule
  ],
  exports : [
    FilterComponent
  ],
  declarations: [FilterComponent]
})
export class FilterModule { }
