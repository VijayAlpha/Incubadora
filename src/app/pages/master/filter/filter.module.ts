import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { NbCheckboxModule, NbRadioModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    NbCheckboxModule,
    NbRadioModule
  ],
  exports : [
    FilterComponent
  ],
  declarations: [FilterComponent]
})
export class FilterModule { }
