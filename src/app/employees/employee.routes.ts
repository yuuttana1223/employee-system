import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./employee-list/employee-list').then(({ EmployeeList }) => EmployeeList),
  },
  {
    path: ':employeeId/edit',
    loadComponent: () =>
      import('./employee-edit/employee-edit').then(({ EmployeeEdit }) => EmployeeEdit),
  },
  {
    path: ':employeeId',
    loadComponent: () =>
      import('./employee-detail/employee-detail').then(({ EmployeeDetail }) => EmployeeDetail),
  },
];
