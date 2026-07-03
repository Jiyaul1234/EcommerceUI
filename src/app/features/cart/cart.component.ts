import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, NotificationService, AuthService } from '@core/services';
import { Cart } from '@shared/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
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

  increaseQuantity(productId: string): void {
    if (this.cart) {
      const item = this.cart.items.find(item => item.product.id === productId);
      if (item) {
        this.cartService.updateQuantity(productId, item.quantity + 1);
      }
    }
  }

  decreaseQuantity(productId: string): void {
    if (this.cart) {
      const item = this.cart.items.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
        this.cartService.updateQuantity(productId, item.quantity - 1);
      }
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.notificationService.showSuccess('Item removed from cart');
  }

  checkout(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/shipping']);
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/shipping' } });
    }
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
      this.notificationService.showSuccess('Cart cleared');
    }
  }
}
