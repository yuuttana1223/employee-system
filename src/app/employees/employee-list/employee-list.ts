import { Component, computed, signal } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeListItem } from '../employee-list-item/employee-list-item';

type EmployeeStatusFilter = 'all' | Employee['status'];

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [EmployeeListItem],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  protected readonly searchTerm = signal('');
  protected readonly statusFilter = signal<EmployeeStatusFilter>('all');

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

  protected readonly filteredEmployees = computed(() => {
    const searchTerm = this.searchTerm().trim();
    const statusFilter = this.statusFilter();

    return this.employees.filter((employee) => {
      const matchesSearchTerm =
        searchTerm === '' || employee.name.includes(searchTerm);

      const matchesStatus =
        statusFilter === 'all' || employee.status === statusFilter;

      return matchesSearchTerm && matchesStatus;
    });
  });

  protected readonly filteredEmployeeCount = computed(
    () => this.filteredEmployees().length,
  );

  protected updateSearchTerm(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  protected updateStatusFilter(statusFilter: string): void {
    if (
      statusFilter !== 'all' &&
      statusFilter !== 'active' &&
      statusFilter !== 'inactive'
    ) {
      return;
    }

    this.statusFilter.set(statusFilter);
  }
}
