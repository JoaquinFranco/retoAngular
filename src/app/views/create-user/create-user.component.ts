import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../../models/employee';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  employeeArr: Employee[] = [];
  employee: Employee = new Employee();
  @Output() showRegister = new EventEmitter<boolean>();
  

  constructor(private fb: FormBuilder, private utils: UtilsService, private location: Location) {
    this.init();
  }

  form = this.fb.group({
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
    pass: ['', [Validators.required]],
    repitPass: ['', [Validators.required]]
  });

  init() {
    if(sessionStorage.getItem('Empleados')) {
      this.employeeArr = JSON.parse(<string>sessionStorage.getItem('Empleados'));
    }
  }

  register() {
    if(this.form.valid) {
      if(this.form.value.pass === this.form.value.repitPass) {
        let newId = 0;
        this.employee.id = this.utils.createId(newId,this.employeeArr);
        this.employee.name = this.form.value.name ? this.form.value.name : '';
        this.employee.country = this.form.value.country ? this.form.value.country : '';
        this.employee.birthDate = this.form.value.birthDate ? this.form.value.birthDate : new Date();
        this.employee.pass = this.form.value.pass ? this.form.value.pass : '';
        this.employeeArr.push(this.employee);
        this.utils.saveEmployeeList(this.employeeArr);
        this.employee = new Employee();
        this.goBack();
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
