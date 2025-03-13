import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vehicle',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss',
})
export class AddVehicleComponent {
  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';

  addVehicleForm = new FormGroup({
    registrationNumber: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    passengerCount: new FormControl('', [Validators.required]),
    insurenceExpDate: new FormControl('', [Validators.required]),
    licenseExpDate: new FormControl('', [Validators.required]),
    driver: new FormControl('', [Validators.required]),
  });

  getAvailableDrivers() {}

  onSubmit() {
    if (this.addVehicleForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-vehicles/register';
      const customerData = this.addVehicleForm.value;

      this.http
        .post<{ status: string; user: any }>(url, customerData)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);

            this.addVehicleForm.reset();

            this.message = 'Vehicle added successfully!';
            this.messageType = 'success';

            setTimeout(() => {
              this.message = '';
              this.messageType = '';
            }, 5000);
          },
          error: (error) => {
            if (error.error && error.error.message) {
              console.error(
                'Vehicle registration failed:',
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
