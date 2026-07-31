import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    }),
    department: new FormControl('', {
      nonNullable: true,
    }),
  });
}
