import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { EmployeeList } from './employees/employee-list/employee-list';

describe('アプリケーションのルーティング', () => {
  it('/employees で従業員一覧を表示する', async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/employees', EmployeeList);

    const heading = harness.routeNativeElement?.querySelector('h1');
    expect(heading?.textContent).toContain('従業員一覧');
  });
});
