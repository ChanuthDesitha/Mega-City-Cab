import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-add-driver',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss',
})
export class AddDriverComponent {
  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';

  addDriverForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    designation: new FormControl('Driver'),
  });

  onSubmit() {
    if (this.addDriverForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-users/register';
      const customerData = this.addDriverForm.value;

      this.http
        .post<{ status: string; user: any }>(url, customerData)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);

            this.addDriverForm.reset();

            this.message = 'Driver added successfully!';
            this.messageType = 'success';

            setTimeout(() => {
              this.message = '';
              this.messageType = '';
            }, 5000);
          },
          error: (error) => {
            if (error.error && error.error.message) {
              console.error(
                'Driver registration failed:',
                error.error.message
              );
              this.message = error.error.message;
              this.messageType = 'error';

              setTimeout(() => {
                this.message = '';
                this.messageType = '';
              }, 5000);
            } else {
              console.error(
                'registration failed:',
                'An unknown error occurred.'
              );
            }
          },
        });
    } else {
      console.log('Invalid Form');
      this.message = 'All fields are required!';
      this.messageType = 'error';

      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 5000);
    }
  }

  closeNotification() {
    this.message = '';
    this.messageType = '';
  }
}
