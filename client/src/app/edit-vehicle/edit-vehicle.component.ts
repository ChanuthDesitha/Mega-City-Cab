import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-vehicle',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss',
})
export class EditVehicleComponent {
  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';
  storedVehicle: any;

  updateVehicleForm = new FormGroup({
    registrationNumber: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    passengerCount: new FormControl('', [Validators.required]),
    insurenceExpDate: new FormControl('', [Validators.required]),
    licenseExpDate: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.storedVehicle = sessionStorage.getItem('selectedVehicle');

    this.updateVehicleForm.patchValue({
      registrationNumber: this.storedVehicle.registrationNumber,
      username: this.storedVehicle.username,
      type: this.storedVehicle.type,
      brand: this.storedVehicle.brand,
      model: this.storedVehicle.model,
      year: this.storedVehicle.year,
      status: this.storedVehicle.status,
      passengerCount: this.storedVehicle.passengerCount,
      insurenceExpDate: this.storedVehicle.insurenceExpDate,
      licenseExpDate: this.storedVehicle.licenseExpDate,
    })
  }

  onSubmit() {
    if (this.updateVehicleForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-users/register';
      const userData = this.updateVehicleForm.value;

      this.http.post<{ status: string; user: any }>(url, userData).subscribe({
        next: (response) => {
          console.log('Success:', response);

          this.message = 'User added successfully!';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 5000);
        },
        error: (error) => {
          if (error.error && error.error.message) {
            console.error('User registration failed:', error.error.message);
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
