export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
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
