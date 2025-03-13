import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-reservation-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  locationErrorMessage: string = 'Please select pickup and dropoff locations!';
  selectedPickupLocation: string = '';
  selectedDropoffLocation: string = '';
  locations: string[] = [];
  distance: number = 0;

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

  currentDate: string = new Date().toISOString().split('T')[0];
  currentTime: string = new Date().toTimeString().split(' ')[0].slice(0, 5);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLocations();
  }

  onCusPhoneChange(customerPhone: string) {
    this.customerPhone = customerPhone;

    if (customerPhone.length === 10) {
      this.getCustomer();
    } else {
      this.customerID = '';
      this.fisrtName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.nic = '';
    }
  }

  getLocations() {
    const url =
      'http://localhost:8080/server_war_exploded/api/locations/get-locations';

    this.http.post<{ pickupLocations: string[]; status: string }>(url, {}).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.pickupLocations) {
          this.locations = response.pickupLocations;
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (error) => {
        console.error('Failed to fetch locations:', error);
      },
    });
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

  onPickupChange(event: Event) {
    this.selectedPickupLocation = (event.target as HTMLSelectElement).value;
    this.getDistance();
  }

  onDropOffChange(event: Event) {
    this.selectedDropoffLocation = (event.target as HTMLSelectElement).value;
    this.getDistance();
  }

  getDistance() {
    if (this.selectedPickupLocation && this.selectedDropoffLocation) {
      const url = `http://localhost:8080/server_war_exploded/api/locations/get-distance`;
      const requestBody = {
        pick: this.selectedPickupLocation,
        drop: this.selectedDropoffLocation,
      };
  
      this.http.post<{ distance: number; status: string }>(url, requestBody).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.distance = response.distance;
          }
          console.log('Distance:', this.distance);
        },
        error: (error) => {
          console.error('Error fetching distance:', error);
        },
      });
    } else {
      this.locationErrorMessage = `Please select ${this.selectedPickupLocation ? 'dropoff' : 'pickup'} location!`;
      console.error(this.locationErrorMessage);
    }
  }

  setPopupVisible() {
    if(this.customerID !== '' && this.registrationNumber !== '' && this.distance !== 0) {
      this.isPopupVisible = true;
    }
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  setScheduleFalse(event: Event) {
    event.preventDefault();
    this.schedule = false;
  }

  setScheduleTrue(event: Event) {
    event.preventDefault();
    this.schedule = true;
  }

  setVehicleType(vehicleType: string, event: Event) {
    event.preventDefault();
    this.vehicleType = vehicleType;
    this.getVehicle();
  }
}
