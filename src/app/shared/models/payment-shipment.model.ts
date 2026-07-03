export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentGatewayResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipment {
  id: string;
  orderId: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  trackingNumber: string;
  carrier: string;
  estimatedDeliveryDate: Date;
  actualDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
