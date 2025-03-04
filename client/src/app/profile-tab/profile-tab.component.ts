import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss'
})
export class ProfileTabComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  phone: string = '';
  email: string = '';
  designation: string = '';

  isEditing: boolean = false;

  constructor() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.username = userData.username;
      this.phone = userData.phone;
      this.email = userData.email;
      this.designation = userData.designation;
    }
  }

  setIsEditing() {
    this.isEditing = !this.isEditing;
  }

  updateUser() {
    
  }
}
