import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('@features/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('@features/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('@features/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('@features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'shipping',
    loadComponent: () => import('@features/shipping/shipping.component').then(m => m.ShippingComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadComponent: () => import('@features/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-success',
    loadComponent: () => import('@features/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('@features/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('@features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('@features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
