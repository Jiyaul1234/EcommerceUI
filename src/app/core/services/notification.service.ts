import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private notificationSubject = new BehaviorSubject<any>(null);
  public notification$ = this.notificationSubject.asObservable();

  constructor() {}

  showLoading(): void {
    this.loadingSubject.next(true);
  }

  hideLoading(): void {
    this.loadingSubject.next(false);
  }

  showSuccess(message: string): void {
    this.showNotification({
      type: 'success',
      message,
      icon: 'check_circle'
    });
  }

  showError(message: string): void {
    this.showNotification({
      type: 'error',
      message,
      icon: 'error'
    });
  }

  showWarning(message: string): void {
    this.showNotification({
      type: 'warning',
      message,
      icon: 'warning'
    });
  }

  showInfo(message: string): void {
    this.showNotification({
      type: 'info',
      message,
      icon: 'info'
    });
  }

  private showNotification(notification: any): void {
    this.notificationSubject.next(notification);
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}
