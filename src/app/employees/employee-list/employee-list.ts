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
  protected readonly employees: Employee[] = [
    {
      id: '1',
      name: '山田 太郎',
      department: '開発部',
      position: 'Webエンジニア',
      status: 'active',
    },
    {
      id: '2',
      name: '佐藤 花子',
      department: '人事部',
      position: '採用担当',
      status: 'active',
    },
    {
      id: '3',
      name: '鈴木 一郎',
      department: '営業部',
      position: '法人営業',
      status: 'inactive',
    },
  ];
}
