import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() messageType: string = '';
  @Output() close = new EventEmitter<void>();

  get iconPath(): string {
    return this.messageType === 'success' ? '/check.png' : '/delete.png';
  }

  closeNotification() {
    this.close.emit();
  }
}
