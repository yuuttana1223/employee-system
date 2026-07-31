import { Component, computed, inject, signal } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
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
  private readonly employeeService = inject(EmployeeService);

  protected readonly searchTerm = signal('');
  protected readonly statusFilter = signal<EmployeeStatusFilter>('all');
  protected readonly employees = this.employeeService.getEmployees();

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
