import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EmployeeList } from './employee-list';

describe('従業員一覧', () => {
  it('従業員名で一覧を絞り込む', async () => {
    TestBed.configureTestingModule({
      imports: [EmployeeList],
      providers: [provideRouter([])],
    });
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
});
