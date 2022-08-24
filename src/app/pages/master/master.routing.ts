import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "department",
    loadChildren: () =>
      import("../master/department/department.module").then((m) => m.DepartmentModule),
  },
];

export const MasterRoutes = RouterModule.forChild(routes);
