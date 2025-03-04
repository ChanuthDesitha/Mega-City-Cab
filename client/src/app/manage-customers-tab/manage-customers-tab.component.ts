import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-customers-tab',
  imports: [],
  templateUrl: './manage-customers-tab.component.html',
  styleUrl: './manage-customers-tab.component.scss',
})
export class ManageCustomersTabComponent {
  @Input() activeTab: string = '';

  @Output() tabChange = new EventEmitter<string>();

  setActive(tab: string) {
    this.tabChange.emit(tab);
  }
}
