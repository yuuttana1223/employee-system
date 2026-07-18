import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees/:employeeId',
    loadComponent: () =>
      import('./employees/employee-detail/employee-detail').then(
        ({ EmployeeDetail }) => EmployeeDetail,
      ),
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./employees/employee-list/employee-list').then(({ EmployeeList }) => EmployeeList),
  },
];
