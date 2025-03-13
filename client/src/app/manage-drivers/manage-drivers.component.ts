import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-drivers',
  imports: [CommonModule],
  templateUrl: './manage-drivers.component.html',
  styleUrl: './manage-drivers.component.scss',
})
export class ManageDriversComponent {
  drivers: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
  }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllDrivers();
  }

  @Input() activeTab: string = '';

  @Output() tabChange = new EventEmitter<{ tab: string; user?: any }>();

  setActive(tab: string, user?: any) {
    this.tabChange.emit({ tab, user });
  }

  getAllDrivers() {
    const url = `http://localhost:8080/server_war_exploded/api/manage-users/get-all-users`;
    const requestBody = {
      designation: 'Driver',
    };

    this.http
      .post<{ drivers: any[]; status: string }>(url, requestBody)
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.drivers = response.drivers;
          }
        },
        error: (error) => {
          console.error('Error fetching distance:', error);
        },
      });
  }
}
