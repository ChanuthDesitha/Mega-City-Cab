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
import { HelpComponent } from '../help/help.component';
import { ManageDriversComponent } from '../manage-drivers/manage-drivers.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageVehiclesComponent } from '../manage-vehicles/manage-vehicles.component';
import { SystemSettingsComponent } from '../system-settings/system-settings.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { AddDriverComponent } from '../add-driver/add-driver.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditDriverComponent } from '../edit-driver/edit-driver.component';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';

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
    HelpComponent,
    ManageDriversComponent,
    ManageUsersComponent,
    ManageVehiclesComponent,
    SystemSettingsComponent,
    AddVehicleComponent,
    AddDriverComponent,
    AddUserComponent,
    EditUserComponent,
    EditDriverComponent,
    EditVehicleComponent
  ],
  templateUrl: './dashboard-action-panel.component.html',
  styleUrl: './dashboard-action-panel.component.scss',
})
export class DashboardActionPanelComponent {
  @Input() activeTab: string = '';
  @Input() selectedUser: any = null;
  @Output() tabChange = new EventEmitter<{ tab: string; user?: any }>();

  setActive(tab: string, user?: any) {
    this.tabChange.emit({tab, user});
  }
}
