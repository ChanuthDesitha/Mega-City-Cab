import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
  }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllUsers();
  }
  @Input() activeTab: string = '';

  @Output() tabChange = new EventEmitter<{ tab: string; user?: any }>();

  setActive(tab: string, user?: any) {
    this.tabChange.emit({ tab, user });
  }

  getAllUsers() {
    const url = `http://localhost:8080/server_war_exploded/api/manage-users/get-all-users`;
    const requestBody = {
      designation: 'Employee',
    };

    this.http
      .post<{ drivers: any[]; status: string }>(url, requestBody)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.users = response.drivers;
          }
        },
        error: (error) => {
          console.error('Error fetching distance:', error);
        },
      });
  }
}
