export interface ShippingAddress {
  id?: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  shippingAddresses: ShippingAddress[];
  defaultShippingAddressId?: string;
  createdAt: Date;
}
