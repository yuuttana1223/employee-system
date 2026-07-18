import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employee-list/employee-list').then(({ EmployeeList }) => EmployeeList),
  },
  {
    path: ':employeeId',
    loadComponent: () =>
      import('./employee-detail/employee-detail').then(({ EmployeeDetail }) => EmployeeDetail),
  },
];
