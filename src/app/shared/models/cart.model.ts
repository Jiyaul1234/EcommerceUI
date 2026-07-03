import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shippingCharges: number;
  tax: number;
  grandTotal: number;
}
