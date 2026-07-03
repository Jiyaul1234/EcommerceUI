import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShippingAddress, Shipment } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = `${environment.apiUrl}/api/shipping`;

  constructor(private http: HttpClient) {}

  saveShippingAddress(address: ShippingAddress): Observable<ShippingAddress> {
    return this.http.post<ShippingAddress>(`${this.apiUrl}/address`, address);
  }

  updateShippingAddress(addressId: string, address: ShippingAddress): Observable<ShippingAddress> {
    return this.http.put<ShippingAddress>(`${this.apiUrl}/address/${addressId}`, address);
  }

  getShippingAddresses(customerId: string): Observable<ShippingAddress[]> {
    return this.http.get<ShippingAddress[]>(`${this.apiUrl}/addresses/${customerId}`);
  }

  deleteShippingAddress(addressId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/address/${addressId}`);
  }

  calculateShippingCost(address: ShippingAddress, weight: number): Observable<{ cost: number; estimatedDays: number }> {
    return this.http.post<{ cost: number; estimatedDays: number }>(`${this.apiUrl}/calculate`, { address, weight });
  }

  getShipment(shipmentId: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/shipment/${shipmentId}`);
  }

  trackShipment(trackingNumber: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/track/${trackingNumber}`);
  }
}
