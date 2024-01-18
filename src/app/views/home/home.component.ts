import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { Employee } from '../../models/employee';
import { UtilsService } from '../../services/utils.service';
import { LoginComponent } from '../login/login.component';
import { ShowUserInfoAppComponent } from '../showUserInfo/show-user-info-app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, LoginComponent, ShowUserInfoAppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  employeeArr: Employee[] = [
    {id: 1, name: 'Prueba', country:'Prueba', pass: 'prueba'}
  ];
  selectedEmployee: Employee = new Employee();
  isSelectEmployee: boolean = false;
  isShowInfoUser: boolean = false;

  constructor(private utils: UtilsService, private router: Router) {
    this.init();
  }

  init() {
    if(sessionStorage.getItem('Empleados')) {
      this.employeeArr = JSON.parse(<string>sessionStorage.getItem('Empleados'));
    } else {
      this.utils.saveEmployeeList(this.employeeArr);
    }
  }

  edit() {
    if(this.selectedEmployee.id === 0) {
      let newId = 0;
      this.selectedEmployee.id = this.utils.createId(newId,this.employeeArr);
      this.employeeArr.push(this.selectedEmployee);
    }
    this.unselectEmployee();
    this.utils.saveEmployeeList(this.employeeArr);
  }

  deleteEmployee() {
    if(confirm('¿Está seguro de querer eliminar el empleado seleccionado?')) {
      this.employeeArr = this.employeeArr.filter((emp) => {
        return emp !== this.selectedEmployee;
      });
    }
    this.unselectEmployee();
    this.utils.saveEmployeeList(this.employeeArr);
  }

  unselectEmployee() {
    this.isSelectEmployee = false;
    this.selectedEmployee = new Employee();
  }

  selectEmployee(employee: Employee) {
    this.isSelectEmployee = true;
    this.selectedEmployee = employee;
  }

  closeSesion() {
    this.utils.login(false);
    this.router.navigateByUrl('/login');
  }

  showUserInfo(emp: Employee) {
    this.selectedEmployee = emp;
    this.isShowInfoUser = true;
  }

  isShowUserInfo() {
    this.isShowInfoUser = !this.isShowInfoUser;
    if(!this.isShowInfoUser) {
      this.selectedEmployee = new Employee();
      this.isSelectEmployee = false;
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}

