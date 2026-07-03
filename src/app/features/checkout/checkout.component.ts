import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  CartService,
  NotificationService,
  OrderService,
  AuthService,
  
} from '@core/services';

import {
  Cart,
  Order,
  ShippingAddress
} from '@shared/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart: Cart | null = null;

  paymentMethod = 'PayPal';

  shippingAddress: ShippingAddress = {
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
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

  private createOrder(cart: Cart): Order {

    return {

      id: '',

      customerId: this.authService.getCurrentUser()?.id || '',

      orderNumber: '',

      items: cart.items.map(item => ({

        productId: item.product.id.toString(),

        productName: item.product.name,

        quantity: item.quantity,

        price: item.product.price,

        totalPrice: item.totalPrice

      })),

      subtotal: cart.subtotal,

      shippingCharges: cart.shippingCharges,

      tax: cart.tax,

      grandTotal: cart.grandTotal,

      shippingAddress: this.shippingAddress,

      paymentMethod: this.paymentMethod,

      paymentStatus: 'pending',

      orderStatus: 'pending',

      shipmentStatus: 'pending',

      trackingNumber: '',

      estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),

      createdAt: new Date(),

      updatedAt: new Date()
    };

  }

  proceedToPayment(): void {

    if (!this.cart) {
      return;
    }

    // Basic validation
    if (
      !this.shippingAddress.fullName ||
      !this.shippingAddress.phoneNumber ||
      !this.shippingAddress.addressLine1 ||
      !this.shippingAddress.city ||
      !this.shippingAddress.state ||
      !this.shippingAddress.postalCode ||
      !this.shippingAddress.country
    ) {

      alert('Please fill in all required shipping details.');
      this.notificationService.showError('Please fill in all required shipping details.');

      return;

    }

    const order = this.createOrder(this.cart);

    this.orderService.createOrder(order).subscribe({

      next: (response) => {

        this.notificationService.showSuccess('Order created successfully.');

        this.router.navigate(['/orders'], {
          state: {
            order: response
          }
        });

      },

      error: () => {

        this.notificationService.showError('Unable to create order.');

      }

    });

  }

  continueShopping(): void {

    this.router.navigate(['/products']);

  }

}