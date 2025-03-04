import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent {
  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';

  addCustomerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.addCustomerForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-customers/register';
      const customerData = this.addCustomerForm.value;

      this.http.post<{ status: string; user: any }>(url, customerData).subscribe({
        next: (response) => {
          console.log('Success:', response);

          this.addCustomerForm.reset();

          this.message = 'Customer added successfully!';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 5000);
        },
        error: (error) => {
          if (error.error && error.error.message) {
            console.error('Customer registration failed:', error.error.message);
            this.message = error.error.message;
            this.messageType = 'error';

            setTimeout(() => {
              this.message = '';
              this.messageType = '';
            }, 5000);
          } else {
            console.error('registration failed:', 'An unknown error occurred.');
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
