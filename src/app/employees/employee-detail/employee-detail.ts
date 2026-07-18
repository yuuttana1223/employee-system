import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
})
export class EmployeeDetail {
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly employeeId =
    this.activatedRoute.snapshot.paramMap.get('employeeId') ?? '不明';
}
