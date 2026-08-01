import { TestBed } from '@angular/core/testing';

import { EmployeeEdit } from './employee-edit';

describe('従業員編集', () => {
  it('氏名を空のままフォーカスから外すと必須エラーを表示する', async () => {
    TestBed.configureTestingModule({
      imports: [EmployeeEdit],
    });

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
});
