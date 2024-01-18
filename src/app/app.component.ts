import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) {
    this.init();
  }

  init() {
    let isLogin = sessionStorage.getItem('login');
    if(!isLogin || (isLogin && isLogin === 'false')) {
      this.router.navigateByUrl('/login');
    } else {
      if (document.URL.includes('home') || document.URL === 'http://localhost:4200/') {
        this.router.navigateByUrl('/home');
      }
    }
  }
}
