import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee-service';

describe('従業員サービス', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('従業員IDに一致する従業員を取得する', () => {
    const employee = service.getEmployeeById('2');

    expect(employee).toEqual({
      id: '2',
      name: '佐藤 花子',
      department: '人事部',
      position: '採用担当',
      status: 'active',
    });
  });

  it('一致する従業員が存在しない場合はundefinedを返す', () => {
    const employee = service.getEmployeeById('999');

    expect(employee).toBeUndefined();
  });

  it('従業員の氏名と部署を更新する', () => {
    const employeeBeforeUpdate = service.getEmployeeById('2');

    if (employeeBeforeUpdate === undefined) {
      throw new Error('更新対象の従業員が見つかりません');
    }

    const updatedEmployee = service.updateEmployee('2', {
      name: '佐藤 花子（更新）',
      department: '開発部',
    });

    if (updatedEmployee === undefined) {
      throw new Error('従業員を更新できませんでした');
    }

    expect(updatedEmployee).toEqual({
      id: '2',
      name: '佐藤 花子（更新）',
      department: '開発部',
      position: '採用担当',
      status: 'active',
    });
    expect(updatedEmployee.id).toBe(employeeBeforeUpdate.id);
    expect(updatedEmployee.position).toBe(employeeBeforeUpdate.position);
    expect(updatedEmployee.status).toBe(employeeBeforeUpdate.status);

    expect(service.getEmployeeById('2')).toEqual(updatedEmployee);
  });
});
