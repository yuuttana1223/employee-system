import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../employee-service';

interface SubmittedEmployee {
  name: string;
  department: string;
}

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.scss',
})
export class EmployeeEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeService = inject(EmployeeService);

  protected readonly employeeId =
    this.route.snapshot.paramMap.get('employeeId') ?? '';

  protected readonly employee = this.employeeService.getEmployeeById(
    this.employeeId,
  );

  protected readonly editForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    department: new FormControl('', {
      nonNullable: true,
    }),
  });

  protected submittedEmployee: SubmittedEmployee | null = null;

  constructor() {
    const employee = this.employee;

    if (employee === undefined) {
      return;
    }

    this.editForm.patchValue({
      name: employee.name,
      department: employee.department,
    });
  }

  protected submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.submittedEmployee = this.editForm.getRawValue();
  }
}
