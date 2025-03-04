import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DefaultTabComponent } from '../default-tab/default-tab.component';
import { NewReservationTabComponent } from '../new-reservation-tab/new-reservation-tab.component';
import { ManageCustomersTabComponent } from '../manage-customers-tab/manage-customers-tab.component';
import { ManageReservationTabComponent } from '../manage-reservation-tab/manage-reservation-tab.component';
import { ProfileTabComponent } from '../profile-tab/profile-tab.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { ReScheduleTabComponent } from '../re-schedule-tab/re-schedule-tab.component';
import { ReservationHistoryTabComponent } from '../reservation-history-tab/reservation-history-tab.component';

@Component({
  selector: 'app-dashboard-action-panel',
  standalone: true,
  imports: [
    CommonModule,
    DefaultTabComponent,
    NewReservationTabComponent,
    ManageCustomersTabComponent,
    ManageReservationTabComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ReScheduleTabComponent,
    ReservationHistoryTabComponent,
    ProfileTabComponent,
  ],
  templateUrl: './dashboard-action-panel.component.html',
  styleUrl: './dashboard-action-panel.component.scss',
})
export class DashboardActionPanelComponent {
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  setActive(tab: string) {
    this.tabChange.emit(tab);
  }
}
