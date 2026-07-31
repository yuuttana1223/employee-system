import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { EmployeeDetail } from './employee-detail';

describe('従業員詳細', () => {
  it('URLの従業員IDに一致する従業員を表示する', async () => {
    const employee: Employee = {
      id: '42',
      name: 'テスト 花子',
      department: '品質保証部',
      position: 'QAエンジニア',
      status: 'active',
    };
    const employeeServiceStub: Pick<EmployeeService, 'getEmployeeById'> = {
      getEmployeeById: (employeeId) =>
        employeeId === employee.id ? employee : undefined,
    };

    TestBed.configureTestingModule({
      imports: [EmployeeDetail],
      providers: [
        provideRouter([
          {
            path: 'employees/:employeeId',
            component: EmployeeDetail,
          },
        ]),
        {
          provide: EmployeeService,
          useValue: employeeServiceStub,
        },
      ],
    });

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/employees/42', EmployeeDetail);

    const element = harness.routeNativeElement;

    if (element === null) {
      throw new Error('EmployeeDetailが表示されていません');
    }

    expect(element.textContent).toContain('名前: テスト 花子');
    expect(element.textContent).toContain('部署: 品質保証部');
    expect(element.textContent).toContain('役職: QAエンジニア');
    expect(element.textContent).toContain('ステータス: 在籍中');
  });

  it('存在しない従業員IDの場合は見つからないことを表示する', async () => {
    const employee: Employee = {
      id: '42',
      name: 'テスト 花子',
      department: '品質保証部',
      position: 'QAエンジニア',
      status: 'active',
    };
    const employeeServiceStub: Pick<EmployeeService, 'getEmployeeById'> = {
      getEmployeeById: (employeeId) =>
        employeeId === employee.id ? employee : undefined,
    };

    TestBed.configureTestingModule({
      imports: [EmployeeDetail],
      providers: [
        provideRouter([
          {
            path: 'employees/:employeeId',
            component: EmployeeDetail,
          },
        ]),
        {
          provide: EmployeeService,
          useValue: employeeServiceStub,
        },
      ],
    });

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/employees/999', EmployeeDetail);

    const element = harness.routeNativeElement;

    if (element === null) {
      throw new Error('EmployeeDetailが表示されていません');
    }

    expect(element.textContent).toContain('従業員が見つかりません');
    expect(element.textContent).not.toContain('テスト 花子');
  });
});
