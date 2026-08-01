import { Service } from '@angular/core';

import { Employee } from './employee';

@Service()
export class EmployeeService {
  private readonly employees: Employee[] = [
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

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployeeById(employeeId: string): Employee | undefined {
    return this.employees.find((employee) => employee.id === employeeId);
  }

  updateEmployee(
    employeeId: string,
    changes: Pick<Employee, 'name' | 'department'>,
  ): Employee | undefined {
    const employeeIndex = this.employees.findIndex((employee) => employee.id === employeeId);

    if (employeeIndex === -1) {
      return undefined;
    }

    const employee = this.employees[employeeIndex];

    if (employee === undefined) {
      return undefined;
    }

    const updatedEmployee: Employee = {
      ...employee,
      ...changes,
    };

    this.employees[employeeIndex] = updatedEmployee;

    return updatedEmployee;
  }
}
