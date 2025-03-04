import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-reservation-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-reservation-tab.component.html',
  styleUrl: './new-reservation-tab.component.scss',
})
export class NewReservationTabComponent {
  schedule: boolean = false;
  isPopupVisible: boolean = false;
  vehicleType: string = '';
  customerPhone: string = '';
  customerErrorMessage: string = 'Please enter a registered customer phone number!';
  vehicleErrorMessage: string = 'Please select a vehicle type!';

  customerID: string = '';
  fisrtName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  nic: string = '';

  registrationNumber: string = '';
  username: string = '';
  brand: string = '';
  licenseExpDate: string = '';
  insuranceExpDate: string = '';

  driverFirstName: string = '';
  driverLastName: string = '';
  driverEmail: string = '';
  driverPhone: string = '';

  private http = inject(HttpClient);

  currentDate: string = new Date().toISOString().split('T')[0];
  currentTime: string = new Date().toTimeString().split(' ')[0].slice(0, 5);

  onCusPhoneChange(customerPhone: string) {
    this.customerPhone = customerPhone;

    if (customerPhone.length === 10) {
      this.getCustomer();
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
            this.customerID = response.customer.id;
            this.fisrtName = response.customer.firstName;
            this.lastName = response.customer.lastName;
            this.email = response.customer.email;
            this.phone = response.customer.phone;
            this.address = response.customer.address;
            this.nic = response.customer.nic;
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.customerErrorMessage = 'Customer Not Found!';
          // this.responseData = 'Error occurred';
        },
      });
  }

  getVehicle() {
    const url =
      'http://localhost:8080/server_war_exploded/api/manage-vehicles/get-available-vehicle';
    const vehicleData = { type: this.vehicleType };

    this.http
      .post<{ status: string; vehicle: any }>(url, vehicleData)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.registrationNumber = response.vehicle.registrationNumber;
            this.username = response.vehicle.username;
            this.brand = response.vehicle.brand;
            this.licenseExpDate = response.vehicle.licenseExpDate;
            this.insuranceExpDate = response.vehicle.insuranceExpDate;
          }

          this.getDriver();
        },
        error: (error) => {
          console.error('Error:', error);
          this.registrationNumber = '';
          this.driverEmail = '';
          this.vehicleErrorMessage = `No available ${this.vehicleType}s at the moment!`;
          // this.responseData = 'Error occurred';
        },
      });
  }

  getDriver() {
    const url =
      'http://localhost:8080/server_war_exploded/api/manage-users/get-user';
    const driverData = { username: this.username };

    this.http.post<{ status: string; user: any }>(url, driverData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.driverFirstName = response.user.firstName;
          this.driverLastName = response.user.lastName;
          this.driverEmail = response.user.email;
          this.driverPhone = response.user.phone;
        }
      },
      error: (error) => {
        console.error('Error:', error);
        // this.responseData = 'Error occurred';
      },
    });
  }

  setIsPopupVisible() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  setSchedule(event: Event) {
    event.preventDefault();
    this.schedule = !this.schedule;
  }

  setVehicleType(vehicleType: string, event: Event) {
    event.preventDefault();
    this.vehicleType = vehicleType;
    this.getVehicle();
  }
}
