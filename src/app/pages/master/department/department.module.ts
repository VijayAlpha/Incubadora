import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { DepartmentRoutes } from './department.routing';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { NbCardModule } from '@nebular/theme';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutes,
    NbCardModule,
    MatPaginatorModule

  ],
  declarations: [DepartmentComponent,DepartmentAddComponent,DepartmentListComponent],
  entryComponents:[
    DepartmentAddComponent
  ]
})
export class DepartmentModule { }
