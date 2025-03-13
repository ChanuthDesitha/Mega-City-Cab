import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-vehicles',
  imports: [CommonModule],
  templateUrl: './manage-vehicles.component.html',
  styleUrl: './manage-vehicles.component.scss',
})
export class ManageVehiclesComponent {
  vehicles: {
    registrationNumber: string;
    username: string;
    type: string;
    brand: string;
    model: string;
    year: number;
    status: string;
    passengerCount: string;
    insurenceExpDate: string;
    licenseExpDate: string;
  }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllVehicles();
  }

  @Input() activeTab: string = '';

  @Output() tabChange = new EventEmitter<string>();

  setActive(tab: string) {
    this.tabChange.emit(tab);
  }

  setVehicle(vehicle: any) {
    if (vehicle) {
      sessionStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
    }
    this.setActive('edit vehicle');
  }

  getAllVehicles() {
    const url = `http://localhost:8080/server_war_exploded/api/manage-vehicles/get-all-vehicles`;

    this.http.post<{ vehicle: any[]; status: string }>(url, {}).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.vehicles = response.vehicle;
        }
      },
      error: (error) => {
        console.error('Error fetching distance:', error);
      },
    });
  }
}
