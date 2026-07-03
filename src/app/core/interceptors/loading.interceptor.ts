import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requestsInProgress = 0;

  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requestsInProgress++;
    this.notificationService.showLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.requestsInProgress--;
        if (this.requestsInProgress === 0) {
          this.notificationService.hideLoading();
        }
      })
    );
  }
}
