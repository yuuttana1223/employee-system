import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { EmployeeEdit } from './employee-edit';

describe('従業員編集', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeEdit],
      providers: [
        provideRouter([
          {
            path: 'employees/:employeeId/edit',
            component: EmployeeEdit,
          },
        ]),
      ],
    });
  });

  it('URLの従業員IDに一致する値をフォームへ設定する', async () => {
    const employee: Employee = {
      id: '42',
      name: 'テスト 太郎',
      department: '人事部',
      position: 'テストエンジニア',
      status: 'active',
    };

    const employeeServiceStub: Pick<EmployeeService, 'getEmployeeById'> = {
      getEmployeeById: (employeeId) =>
        employeeId === employee.id ? employee : undefined,
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: EmployeeService,
          useValue: employeeServiceStub,
        },
      ],
    });

    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/employees/42/edit', EmployeeEdit);

    const element = harness.routeNativeElement;

    if (element === null) {
      throw new Error('EmployeeEditが表示されていません');
    }

    const nameInput = element.querySelector<HTMLInputElement>('#employee-name');
    const departmentSelect = element.querySelector<HTMLSelectElement>(
      '#employee-department',
    );
    const submitButton = element.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );

    if (
      nameInput === null ||
      departmentSelect === null ||
      submitButton === null
    ) {
      throw new Error('編集フォームの要素が見つかりません');
    }

    expect(nameInput.value).toBe('テスト 太郎');
    expect(departmentSelect.value).toBe('人事部');
    expect(submitButton.disabled).toBe(false);
  });

  it('氏名を空のままフォーカスから外すと必須エラーを表示する', async () => {
    const fixture = TestBed.createComponent(EmployeeEdit);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).not.toContain('氏名は必須です');

    const nameInput = element.querySelector<HTMLInputElement>('#employee-name');

    if (nameInput === null) {
      throw new Error('氏名inputが見つかりません');
    }

    nameInput.dispatchEvent(new Event('focus'));
    nameInput.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    expect(element.textContent).toContain('氏名は必須です');
  });

  it('氏名を入力すると必須エラーを非表示にする', async () => {
    const fixture = TestBed.createComponent(EmployeeEdit);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector<HTMLInputElement>('#employee-name');

    if (nameInput === null) {
      throw new Error('氏名inputが見つかりません');
    }

    nameInput.dispatchEvent(new Event('blur'));

    await fixture.whenStable();

    expect(element.textContent).toContain('氏名は必須です');

    nameInput.value = '田中 太郎';
    nameInput.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(element.textContent).not.toContain('氏名は必須です');
    expect(element.textContent).toContain('氏名: 田中 太郎');
  });

  it('有効なフォームを送信すると送信内容を表示する', async () => {
    const fixture = TestBed.createComponent(EmployeeEdit);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const nameInput = element.querySelector<HTMLInputElement>('#employee-name');
    const departmentSelect =
      element.querySelector<HTMLSelectElement>('#employee-department');
    const submitButton = element.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );

    if (
      nameInput === null ||
      departmentSelect === null ||
      submitButton === null
    ) {
      throw new Error('フォーム要素が見つかりません');
    }

    expect(submitButton.disabled).toBe(true);
    expect(element.textContent).not.toContain('送信内容');

    nameInput.value = '田中 太郎';
    nameInput.dispatchEvent(new Event('input'));

    departmentSelect.value = '開発部';
    departmentSelect.dispatchEvent(new Event('change'));

    await fixture.whenStable();

    expect(submitButton.disabled).toBe(false);

    submitButton.click();

    await fixture.whenStable();

    expect(element.textContent).toContain('送信内容');
    expect(element.textContent).toContain('氏名: 田中 太郎');
    expect(element.textContent).toContain('部署: 開発部');
  });
});
