import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent {
  private http = inject(HttpClient);
  customerPhone: string = '';
  customerErrorMessage: string = '';
  message: string = '';
  messageType: string = '';

  editCustomerForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
  });

  onCusPhoneChange(customerPhone: string) {
    this.customerPhone = customerPhone;

    if (customerPhone.length === 10) {
      this.getCustomer();
    }

    if (customerPhone.length < 10) {
      this.editCustomerForm.reset();
      this.customerErrorMessage = '';
    }
  }

  getCustomer() {
    const url =
      'http://localhost:8080/server_war_exploded/api/manage-customers/get-customer';
    const customerData = { phone: this.customerPhone };

    this.http
      .post<{ status: string; customer: any }>(url, customerData)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.editCustomerForm.patchValue({
              id: response.customer.id,
              firstName: response.customer.firstName,
              lastName: response.customer.lastName,
              phone: response.customer.phone,
              email: response.customer.email,
              address: response.customer.address,
              nic: response.customer.nic
            });
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.customerErrorMessage = 'Customer Not Found!';
          // this.responseData = 'Error occurred';
        },
      });
  }

  onSubmit() {
    if (this.editCustomerForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-customers/update';
      const customerData = this.editCustomerForm.value;

      console.log('Customer Data:', customerData);

      this.http.post<{ status: string; user: any }>(url, customerData).subscribe({
        next: (response) => {
          console.log('Success:', response);

          this.editCustomerForm.reset();

          this.message = 'Customer updated successfully!';
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
