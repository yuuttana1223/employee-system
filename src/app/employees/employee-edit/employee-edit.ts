import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  protected submit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.submittedEmployee = this.editForm.getRawValue();
  }
}
