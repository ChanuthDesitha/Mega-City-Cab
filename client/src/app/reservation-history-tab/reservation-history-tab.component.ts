import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-reservation-history-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-history-tab.component.html',
  styleUrl: './reservation-history-tab.component.scss',
})
export class ReservationHistoryTabComponent {
  customerPhone: string = '';
  customerErrorMessage: string = '';

  private http = inject(HttpClient);

  onCusPhoneChange(customerPhone: string) {
    this.customerPhone = customerPhone;

    if (customerPhone.length === 10) {
      this.getCustomer();
    }

    if (customerPhone.length < 10) {
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
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.customerErrorMessage = 'Customer Not Found!';
          // this.responseData = 'Error occurred';
        },
      });
  }
}
