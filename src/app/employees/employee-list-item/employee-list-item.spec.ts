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
});
