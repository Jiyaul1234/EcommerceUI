import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, AuthService, NotificationService } from '@core/services';
import { Order } from '@shared/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  currentPage = 1;
  pageSize = 10;
  totalOrders = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.orderService.getCustomerOrders(currentUser.id, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.totalOrders = response.total;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showError('Failed to load orders');
      }
    });
  }

  viewOrderDetails(orderId: string): void {
    this.router.navigate(['/order', orderId]);
  }

  cancelOrder(orderId: string): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.notificationService.showSuccess('Order cancelled successfully');
          this.loadOrders();
        },
        error: (err) => {
          this.notificationService.showError('Failed to cancel order');
        }
      });
    }
  }

  trackOrder(orderId: string): void {
    this.orderService.getOrderTracking(orderId).subscribe({
      next: (tracking) => {
        // Show tracking information
        this.notificationService.showInfo(`Tracking: ${tracking.status}`);
      },
      error: (err) => {
        this.notificationService.showError('Failed to get tracking information');
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-warning';
      case 'confirmed':
        return 'bg-info';
      case 'processing':
        return 'bg-primary';
      case 'shipped':
        return 'bg-primary';
      case 'delivered':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalOrders / this.pageSize);
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }
}
