import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TabButtonComponent } from '../tab-button/tab-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-side-panel',
  standalone: true,
  imports: [CommonModule, TabButtonComponent],
  templateUrl: './dashboard-side-panel.component.html',
  styleUrl: './dashboard-side-panel.component.scss',
})
export class DashboardSidePanelComponent {
  private router = inject(Router);

  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  firstName: string = '';
  designation: string = '';
  greeting: string = '';
  tabButtons: {tabName: string, iconPath: string}[] = [];

  constructor() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.firstName = userData.firstName || 'User';
      this.designation = userData.designation || 'Employee';
    }

    this.setGreeting();
    this.setButtns();
  }

  setActive(tab: string) {
    this.tabChange.emit(tab);
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  setButtns() {
    const employeeButtons = [
      {tabName: 'new reservation', iconPath: '/add.png'},
      {tabName: 'manage customers', iconPath: '/customer.png'},
      {tabName: 'manage reservations', iconPath: '/time-management.png'}
    ];

    const adminButtons = [
      {tabName: 'new reservation', iconPath: '/add.png'},
      {tabName: 'manage customers', iconPath: '/customer.png'},
      {tabName: 'manage reservations', iconPath: '/time-management.png'}
    ];

    const driverButtons = [
      {tabName: 'new reservation', iconPath: '/add.png'},
      {tabName: 'manage customers', iconPath: '/customer.png'},
      {tabName: 'manage reservations', iconPath: '/time-management.png'}
    ];

    this.tabButtons = this.designation === 'Employee' ? employeeButtons : this.designation === 'Admin' ? adminButtons : driverButtons;
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
