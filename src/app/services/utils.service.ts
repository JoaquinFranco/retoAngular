import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  saveEmployeeList(employees: Employee[]) {
    sessionStorage.setItem('Empleados', JSON.stringify(employees));
  }

  createId(newId: number, employeeArr: Employee[]): number {
    let existId = false;
    employeeArr.find((emp) => {
      if (emp.id === newId) {
        existId = true;
      }
    });
    if(existId) {
      newId++;
      newId = this.createId(newId, employeeArr);
    }
    return newId;
  }

  login(isLogin: boolean) {
    sessionStorage.setItem('login', JSON.stringify(isLogin));
  }

}
