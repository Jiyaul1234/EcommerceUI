import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, NotificationService } from '@core/services';
import { Cart } from '@shared/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (!cart || cart.items.length === 0) {
        this.notificationService.showError('Cart is empty');
        this.router.navigate(['/cart']);
      }
    });
  }

  proceedToPayment(): void {
    this.router.navigate(['/payment']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
