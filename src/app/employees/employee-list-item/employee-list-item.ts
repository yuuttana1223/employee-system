import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list-item.html',
  styleUrl: './employee-list-item.scss',
})
export class EmployeeListItem {
  readonly employee = input.required<Employee>();
}
