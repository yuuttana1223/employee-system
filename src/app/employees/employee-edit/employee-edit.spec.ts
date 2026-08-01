import { TestBed } from '@angular/core/testing';

import { EmployeeEdit } from './employee-edit';

describe('従業員編集', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeEdit],
    });
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
