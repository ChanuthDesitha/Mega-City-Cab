import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-reservation-tab',
  imports: [],
  templateUrl: './manage-reservation-tab.component.html',
  styleUrl: './manage-reservation-tab.component.scss',
})
export class ManageReservationTabComponent {
  @Input() activeTab: string = '';

  @Output() tabChange = new EventEmitter<string>();

  setActive(tab: string) {
    this.tabChange.emit(tab);
  }
}
