import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading$ | async" class="spinner-overlay">
      <div class="spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading...</p>
      </div>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .spinner {
      text-align: center;
      color: white;

      .spinner-border {
        width: 3rem;
        height: 3rem;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private notificationService: NotificationService) {
    this.isLoading$ = this.notificationService.loading$;
  }
}
