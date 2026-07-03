import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService, CartService, NotificationService, AuthService } from '@core/services';
import { Cart } from '@shared/models';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cart: Cart | null = null;
  isProcessing = false;
  selectedPaymentMethod = 'paypal';

  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  processPayment(): void {
    if (!this.cart) return;

    this.isProcessing = true;
    const paymentData = {
      amount: this.cart.grandTotal,
      paymentMethod: this.selectedPaymentMethod,
      orderId: 'ORD-' + Date.now()
    };

    this.paymentService.processPayment(paymentData).subscribe({
      next: (payment) => {
        this.notificationService.showSuccess('Payment processed successfully!');
        this.router.navigate(['/order-success']);
      },
      error: (err) => {
        this.isProcessing = false;
        this.notificationService.showError('Payment failed. Please try again.');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/checkout']);
  }
}
