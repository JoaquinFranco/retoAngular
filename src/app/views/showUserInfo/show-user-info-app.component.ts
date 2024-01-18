import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-show-user-info-app',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './show-user-info-app.component.html',
  styleUrl: './show-user-info-app.component.css'
})
export class ShowUserInfoAppComponent {

  @Input() employee: Employee = new Employee();
  @Output() showUserInfo = new EventEmitter<boolean>();

  volver() {
    this.showUserInfo.emit();
  }

}
