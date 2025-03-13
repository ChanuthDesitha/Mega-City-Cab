import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  @Input() user: any;

  private http = inject(HttpClient);
  message: string = '';
  messageType: string = '';

  updateUserForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    designation: new FormControl('Employee'),
  });

  ngOnInit() {
    if (this.user) {
      this.updateUserForm.patchValue({
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        email: this.user.email,
        username: this.user.username,
      });
    }
  }

  onSubmit() {
    if (this.updateUserForm.valid) {
      const url =
        'http://localhost:8080/server_war_exploded/api/manage-users/update';
      const userData = this.updateUserForm.value;

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
