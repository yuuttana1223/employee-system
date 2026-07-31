import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../employee-service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetail {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly employeeService = inject(EmployeeService);

  protected readonly employeeId =
    this.activatedRoute.snapshot.paramMap.get('employeeId') ?? '';

  protected readonly employee = this.employeeService.getEmployeeById(
    this.employeeId,
  );
}
