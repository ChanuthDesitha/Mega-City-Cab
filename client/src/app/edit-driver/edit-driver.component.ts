import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-edit-driver',
  imports: [CommonModule, ReactiveFormsModule, NotificationComponent],
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.scss',
})
export class EditDriverComponent {
  @Input() driver: any;

  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';

  updateDriverForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    designation: new FormControl('Driver'),
  });

  ngOnInit() {
    if (this.driver) {
      this.updateDriverForm.patchValue({
        id: this.driver.id,
        firstName: this.driver.firstName,
        lastName: this.driver.lastName,
        phone: this.driver.phone,
        email: this.driver.email,
        username: this.driver.username,
      });
    }
  }

  onSubmit() {
    if (this.updateDriverForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-users/update';
      const userData = this.updateDriverForm.value;

      console.log('User Data:', userData);

      this.http.post<{ status: string; user: any }>(url, userData).subscribe({
        next: (response) => {
          console.log('Success:', response);

          this.message = 'Driver updated successfully!';
          this.messageType = 'success';

          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 5000);
        },
        error: (error) => {
          if (error.error && error.error.message) {
            console.error('Driver update failed:', error.error.message);
            this.message = error.error.message;
            this.messageType = 'error';

            setTimeout(() => {
              this.message = '';
              this.messageType = '';
            }, 5000);
          } else {
            console.error('update failed:', 'An unknown error occurred.');
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
