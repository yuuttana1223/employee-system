import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EmployeeList } from './employee-list';

describe('従業員一覧', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeList],
      providers: [provideRouter([])],
    });
  });

  it('従業員名で一覧を絞り込む', async () => {
    const fixture = TestBed.createComponent(EmployeeList);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('山田 太郎');
    expect(element.textContent).toContain('佐藤 花子');
    expect(element.textContent).toContain('鈴木 一郎');
    expect(element.textContent).toContain('表示件数: 3件');

    const input = element.querySelector<HTMLInputElement>(
      '#employee-search-term',
    );

    if (input === null) {
      throw new Error('検索inputが見つかりません');
    }

    input.value = '山田';
    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(element.textContent).toContain('山田 太郎');
    expect(element.textContent).not.toContain('佐藤 花子');
    expect(element.textContent).not.toContain('鈴木 一郎');
    expect(element.textContent).toContain('表示件数: 1件');
  });

  it('在籍ステータスで従業員を絞り込む', async () => {
    const fixture = TestBed.createComponent(EmployeeList);
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const select = element.querySelector<HTMLSelectElement>(
      '#employee-status-filter',
    );

    if (select === null) {
      throw new Error('在籍ステータスのselectが見つかりません');
    }

    select.value = 'inactive';
    select.dispatchEvent(new Event('change'));

    await fixture.whenStable();

    expect(element.textContent).toContain('鈴木 一郎');
    expect(element.textContent).not.toContain('山田 太郎');
    expect(element.textContent).not.toContain('佐藤 花子');
    expect(element.textContent).toContain('表示件数: 1件');
    expect(element.textContent).toContain('ステータス: 退職済み');
  });
});
