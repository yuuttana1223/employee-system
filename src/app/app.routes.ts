import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employee.routes').then((module) => module.routes),
  },
];
