import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/api/payment`;

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/process`, paymentData);
  }

  getPaymentStatus(paymentId: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${paymentId}/status`);
  }

  refundPayment(paymentId: string): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/${paymentId}/refund`, {});
  }

  validatePaymentMethod(methodData: any): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, methodData);
  }
}
