import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  protected readonly employee: Employee = {
    id: '1',
    name: '山田 太郎',
    department: '開発部',
    position: 'Webエンジニア',
  };
}
