import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, Product } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'ecommerce_cart';
  private cartSubject = new BehaviorSubject<Cart>(this.getCartFromStorage());
  public cart$ = this.cartSubject.asObservable();

  private readonly SHIPPING_CHARGES = 50;
  private readonly TAX_RATE = 0.1;

  constructor() {}

  addToCart(product: Product, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
    } else {
      cart.items.push({
        product,
        quantity,
        totalPrice: product.price * quantity
      });
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter(item => item.product.id !== productId);
    this.updateCart(cart);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const cart = this.cartSubject.value;
    const item = cart.items.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.product.price * quantity;
      this.updateCart(cart);
    }
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      shippingCharges: this.SHIPPING_CHARGES,
      tax: 0,
      grandTotal: 0
    };
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  getCartTotal(): number {
    return this.cartSubject.value.grandTotal;
  }

  getCartItemsCount(): number {
    return this.cartSubject.value.totalItems;
  }

  private updateCart(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.shippingCharges = this.SHIPPING_CHARGES;
    cart.tax = cart.subtotal * this.TAX_RATE;
    cart.grandTotal = cart.subtotal + cart.shippingCharges + cart.tax;

    this.cartSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  private getCartFromStorage(): Cart {
    const cart = localStorage.getItem(this.CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : {
      items: [],
      totalItems: 0,
      subtotal: 0,
      shippingCharges: this.SHIPPING_CHARGES,
      tax: 0,
      grandTotal: 0
    };
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }
}
