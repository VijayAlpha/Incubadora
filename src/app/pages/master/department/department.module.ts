import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutes } from './department.routing';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterComponent } from '../filter/filter.component';
import { FilterModule } from '../filter/filter.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutes,
    NbCardModule,
    MatPaginatorModule,
    FilterModule,
    NbCheckboxModule,
  ],
  declarations: [DepartmentComponent,DepartmentAddComponent,DepartmentListComponent,],
  entryComponents:[
    DepartmentAddComponent
  ]
})
export class DepartmentModule { }
