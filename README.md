# Modern E-Commerce Web Application

A full-featured, responsive e-commerce web application built with **Angular 18+**, **Angular Material**, and **Bootstrap 5**. This application follows clean architecture principles with reusable components, services, and implements modern web development best practices.

## Features

### 🛍️ Shopping Features
- **Home Page**: Hero section, product categories, featured products, and key features showcase
- **Product Catalog**: Browse products with filtering by category, sorting options, and pagination
- **Product Details**: Detailed product view with image gallery, reviews, ratings, and related products
- **Shopping Cart**: Add/remove items, manage quantities, view order summary with tax and shipping calculations
- **Checkout Flow**: Multi-step checkout with shipping address collection and payment processing

### 👤 User Authentication
- **User Registration**: Email, mobile number, and password validation
- **User Login**: JWT-based authentication with remember me functionality
- **Session Management**: Automatic token refresh and secure logout
- **Route Guards**: Protected routes requiring authentication (Checkout, Orders, Payment)

### 🚚 Order Management
- **Order Placement**: Complete order creation with cart items and shipping details
- **Order History**: View all user orders with pagination, status tracking, and filtering
- **Order Tracking**: Real-time shipment tracking and status updates
- **Order Cancellation**: Cancel orders with status-based restrictions

### 💳 Payment Processing
- **Payment Methods**: Multiple payment gateway support (PayPal integration ready)
- **Order Confirmation**: Instant confirmation with order number and estimated delivery
- **Order History**: Comprehensive order history with payment and shipment status

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Material Design**: Material icons and design principles throughout
- **Bootstrap Integration**: Clean, modern Bootstrap 5 styling
- **Accessibility**: WCAG 2.1 compliant with semantic HTML

### ⚙️ Technical Features
- **Standalone Components**: Modern Angular standalone component pattern
- **Lazy Loading**: Route-based code splitting for better performance
- **HTTP Interceptors**: JWT token injection and loading state management
- **State Management**: RxJS BehaviorSubjects for reactive data flow
- **Form Validation**: Reactive forms with comprehensive validation patterns
- **Error Handling**: Centralized error handling and user notifications
- **Environment Configuration**: Development and production configuration

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Angular 18+ |
| **Language** | TypeScript 5.5 |
| **Styling** | SCSS, Bootstrap 5.3 |
| **State Management** | RxJS 7.8 |
| **HTTP Client** | Angular HttpClient |
| **Forms** | Reactive Forms |
| **Icons** | Material Icons |
| **UI Components** | Angular Material, Bootstrap |

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services, guards, interceptors
│   │   ├── services/           # Authentication, Product, Cart, Order, Payment, Shipping
│   │   ├── guards/             # Route guards (AuthGuard)
│   │   └── interceptors/        # HTTP interceptors (JWT, Loading)
│   │
│   ├── shared/                  # Shared components and models
│   │   ├── components/         # Reusable UI components
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── product-card/
│   │   │   └── loading-spinner/
│   │   │
│   │   └── models/             # Data interfaces
│   │
│   ├── features/                # Feature modules
│   │   ├── home/               # Home page
│   │   ├── products/           # Product listing with filters
│   │   ├── product-detail/     # Single product view
│   │   ├── cart/               # Shopping cart
│   │   ├── auth/               # Login and Register
│   │   ├── checkout/           # Checkout summary
│   │   ├── shipping/           # Shipping address form
│   │   ├── payment/            # Payment processing
│   │   ├── order-confirmation/ # Order success page
│   │   └── orders/             # Order history
│   │
│   ├── app.routes.ts           # Application routing configuration
│   ├── app.config.ts           # Application providers
│   ├── app.component.ts        # Root component
│   └── styles.scss             # Global styles
│
├── environments/               # Environment configuration
│   ├── environment.ts          # Development
│   └── environment.prod.ts     # Production
│
├── index.html                  # Entry point
└── main.ts                     # Bootstrap file
```

## Installation & Setup

### Prerequisites
- **Node.js**: v22.19.0 or higher
- **npm**: 10.9.3 or higher
- **Angular CLI**: 18+ (installed globally)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UI
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Configuration**
   - Update `src/environments/environment.ts` with your backend API URL
   - Update `src/environments/environment.prod.ts` for production

4. **Start development server**
   ```bash
   ng serve --open
   ```
   
   The application will open at `http://localhost:4200`

## Available Scripts

```bash
# Start development server
npm start
# or
ng serve --open

# Build for production
npm run build
# or
ng build --configuration production

# Run unit tests
npm test
# or
ng test

# Run E2E tests
npm run e2e
# or
ng e2e

# Lint code
npm run lint
# or
ng lint
```

## Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, categories, and featured products |
| Products | `/products` | Product catalog with filtering and pagination |
| Product Detail | `/product/:id` | Single product with details and gallery |
| Cart | `/cart` | Shopping cart with item management |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Checkout | `/checkout` | Order review (requires auth) |
| Shipping | `/shipping` | Shipping address collection (requires auth) |
| Payment | `/payment` | Payment processing (requires auth) |
| Order Confirmation | `/order-success` | Order placement success |
| My Orders | `/orders` | Order history and tracking |

## Authentication

### JWT Token Management
- Tokens are stored in `localStorage` with key `'token'`
- JWT interceptor automatically injects Bearer token in all HTTP requests
- 401/403 responses redirect to login with return URL preserved
- Logout clears token and cart data

### Protected Routes
Routes protected by `AuthGuard`:
- `/checkout`
- `/shipping`
- `/payment`
- `/orders`

## Services

### Core Services

#### AuthService
- User authentication (login, register, logout)
- JWT token management
- Current user tracking
- Authentication state

#### ProductService
- Fetch all products with pagination and filtering
- Search products
- Get product by ID
- Get product categories
- Get related products

#### CartService
- Add/remove items from cart
- Update item quantities
- Calculate totals with tax and shipping
- Cart persistence to localStorage

#### OrderService
- Create new orders
- Get order details
- Fetch customer orders
- Cancel orders
- Track shipments

#### PaymentService
- Process payments
- Check payment status
- Process refunds
- Validate payment methods

#### ShippingService
- Save/update shipping addresses
- Calculate shipping costs
- Track shipments
- Get shipment details

#### NotificationService
- Show success/error/warning/info messages
- Loading state management
- Auto-dismiss notifications

## Form Validation

### Login Form
- Email validation (required, email format)
- Password validation (required, min 6 characters)

### Register Form
- First Name & Last Name (required)
- Email (required, email format)
- Mobile Number (required, 10 digits)
- Password (required, min 6 characters)
- Confirm Password (must match password)

### Shipping Form
- Full Name (required)
- Mobile Number (required, 10 digits)
- Email (required, email format)
- Address Line 1 & 2 (required)
- City, State, Country (required)
- Pincode (required, 6 digits)

## Styling

### Global Styles
- Custom Bootstrap variables and utilities
- Material icon sizing and styling
- CSS animations and transitions
- Responsive breakpoints
- Consistent color scheme

### Component Styles
- Card hover effects with elevation
- Button animations
- Form input focus states
- Badge styling
- Table styling with row hover effects

## Key Features Implementation

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Flexible layouts with CSS Flexbox
- Media queries for tablet and desktop

### Performance Optimization
- Lazy loading routes
- Tree-shaking with standalone components
- HTTP request deduplication
- LocalStorage for cart persistence

### User Experience
- Loading spinners for async operations
- Toast notifications for feedback
- Form validation with error messages
- Empty states with helpful messaging
- Breadcrumb navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

### Code Style
- TypeScript strict mode enabled
- Path aliases for imports (@app, @core, @shared, @features, @environments)
- Consistent naming conventions
- Comments for complex logic

### Component Structure
```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, ...],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent {
  // Component logic
}
```

## Error Handling

- HTTP 401: Redirect to login
- HTTP 403: Show forbidden message
- HTTP 500: Show error notification
- Network errors: Show retry option
- Form errors: Inline validation messages

## Future Enhancements

- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Order status email notifications
- [ ] Multiple payment gateway integration
- [ ] Inventory management
- [ ] Admin dashboard
- [ ] Unit and E2E tests
- [ ] PWA support
- [ ] SEO optimization

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Angular 18+**
