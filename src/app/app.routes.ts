import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employee-list/employee-list').then(({ EmployeeList }) => EmployeeList),
  },
];
