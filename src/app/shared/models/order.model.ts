import { Product } from './product.model';
import { ShippingAddress } from './customer.model';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingCharges: number;
  tax: number;
  grandTotal: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipmentStatus: 'pending' | 'in-transit' | 'delivered';
  trackingNumber?: string;
  estimatedDeliveryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
