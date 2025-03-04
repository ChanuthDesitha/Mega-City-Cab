import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginRightComponent } from '../login-right/login-right.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, LoginRightComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if(user) {
      this.router.navigate(['/dashboard']);
    }
  }
}
