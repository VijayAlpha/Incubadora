import { Routes, RouterModule } from '@angular/router';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentComponent } from './department.component';

const routes: Routes = [
  {
    path: "",
    component: DepartmentComponent,
  },
  {
    path: "add",
    component: DepartmentAddComponent,
  },
];

export const DepartmentRoutes = RouterModule.forChild(routes);
