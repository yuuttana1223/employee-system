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
});
