import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CreateUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  employeeArr: Employee[] = [];
  employee: Employee = new Employee();
  isShowRegisterForm: boolean = false;
  @Output() logged = new EventEmitter<boolean>();

  constructor(private router: Router, private utils: UtilsService) {
    this.init();
  }

  init() {
    this.loadEmployeeArr();
  }

  login() {
    let exist = false;
    this.employeeArr.find((emp) => {{
      if (emp.name === this.employee.name
        && emp.pass === this.employee.pass) {
          exist = true;
        }
    }});
    if(exist) {
      this.utils.login(true);
      this.router.navigateByUrl('/home');
    } else {
      alert('El usuario no existe!');
    }
  }

  showRegister() {
    this.router.navigateByUrl('/register');
  }
  loadEmployeeArr() {
    if(sessionStorage.getItem('Empleados')) {
      this.employeeArr = JSON.parse(<string>sessionStorage.getItem('Empleados'));
    }
  }
}
