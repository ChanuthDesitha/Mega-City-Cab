import { Component } from '@angular/core';
import { DashboardActionPanelComponent } from '../dashboard-action-panel/dashboard-action-panel.component';
import { DashboardSidePanelComponent } from '../dashboard-side-panel/dashboard-side-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardActionPanelComponent, DashboardSidePanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  activeTab: string = '';
  selectedUser: any = null;

  setActive(tab: string, user?: any) {
    this.activeTab = tab;
    if (user) {
      this.selectedUser = user;
    }
  }
}
