import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-button.component.html',
  styleUrl: './tab-button.component.scss',
})
export class TabButtonComponent {
  @Input() activeTab: string = '';
  @Input() tabName: string = '';
  @Input() iconPath: string = '';

  @Output() tabChange = new EventEmitter<string>();

  setActive() {
    this.tabChange.emit(this.tabName);
  }
}
