import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Employee } from '../employee';
import { EmployeeListItem } from './employee-list-item';

describe('従業員一覧項目', () => {
  const employee: Employee = {
    id: '1',
    name: '山田 太郎',
    department: '開発部',
    position: 'Webエンジニア',
    status: 'active',
  };

  it('従業員名を表示する', async () => {
    TestBed.configureTestingModule({
      imports: [EmployeeListItem],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(EmployeeListItem);

    fixture.componentRef.setInput('employee', employee);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('名前: 山田 太郎');
  });

  it('在籍ステータスの変更を表示へ反映する', async () => {
    TestBed.configureTestingModule({
      imports: [EmployeeListItem],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(EmployeeListItem);

    const activeEmployee: Employee = {
      id: '1',
      name: '山田 太郎',
      department: '開発部',
      position: 'Webエンジニア',
      status: 'active',
    };

    fixture.componentRef.setInput('employee', activeEmployee);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('ステータス: 在籍中');

    const inactiveEmployee: Employee = {
      ...activeEmployee,
      status: 'inactive',
    };

    fixture.componentRef.setInput('employee', inactiveEmployee);
    await fixture.whenStable();

    expect(element.textContent).toContain('ステータス: 退職済み');
    expect(element.textContent).not.toContain('ステータス: 在籍中');
  });

  it('従業員IDから詳細リンクを生成する', async () => {
    TestBed.configureTestingModule({
      imports: [EmployeeListItem],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(EmployeeListItem);

    const employee: Employee = {
      id: '42',
      name: '山田 太郎',
      department: '開発部',
      position: 'Webエンジニア',
      status: 'active',
    };

    fixture.componentRef.setInput('employee', employee);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const link = element.querySelector<HTMLAnchorElement>('a');

    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('/employees/42');
  });
});
