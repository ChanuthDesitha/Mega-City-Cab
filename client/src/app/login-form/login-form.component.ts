import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  errormessage: string = '';

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const url = 'http://localhost:8080/server_war_exploded/api/auth/login';
      const loginData = this.loginForm.value;

      this.http.post<{ status: string; user: any }>(url, loginData).subscribe({
        next: (response) => {
          console.log('Login Successful:', response);

          sessionStorage.setItem('user', JSON.stringify(response.user));

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          if (error.error && error.error.message) {
            console.error('Login Failed:', error.error.message);
            this.errormessage = error.error.message;
          } else {
            console.error('Login Failed:', 'An unknown error occurred.');
          }
        },
      });
    } else {
      console.log('Invalid Form');
      this.errormessage = 'Please enter valid credentials!';
    }
  }
}
