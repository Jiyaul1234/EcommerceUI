# API Documentation

## Overview

This document describes the backend API endpoints expected by the E-Commerce application. The application communicates with a REST API running on a configurable backend server (default: `http://localhost:3000`).

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://api.yourdomain.com`

## Authentication

All authenticated endpoints require a JWT Bearer token in the Authorization header:

```
Authorization: Bearer {token}
```

## Response Format

All responses follow a standard format:

```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Endpoints

### Authentication

#### Register User
- **Method**: POST
- **URL**: `/api/auth/register`
- **Auth Required**: No
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "token": "jwt_token",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
- **Method**: POST
- **URL**: `/api/auth/login`
- **Auth Required**: No
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "token": "jwt_token",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Forgot Password
- **Method**: POST
- **URL**: `/api/auth/forgot-password`
- **Auth Required**: No
- **Request Body**:
```json
{
  "email": "john@example.com"
}
```

#### Reset Password
- **Method**: POST
- **URL**: `/api/auth/reset-password`
- **Auth Required**: No
- **Request Body**:
```json
{
  "token": "reset_token",
  "newPassword": "newpassword123"
}
```

### Products

#### Get All Products
- **Method**: GET
- **URL**: `/api/products?page=1&limit=12&category=electronics&sort=rating&search=laptop`
- **Auth Required**: No
- **Query Parameters**:
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 12)
  - `category` (string): Filter by category
  - `sort` (string): Sort by field (rating, price, newest)
  - `search` (string): Search term
- **Response**:
```json
{
  "success": true,
  "data": {
    "products": [],
    "total": 100,
    "page": 1,
    "limit": 12
  }
}
```

#### Get Product by ID
- **Method**: GET
- **URL**: `/api/products/:id`
- **Auth Required**: No
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "discount": 10,
    "images": [],
    "category": "electronics",
    "rating": 4.5,
    "reviews": [],
    "stock": 50
  }
}
```

#### Get Categories
- **Method**: GET
- **URL**: `/api/products/categories`
- **Auth Required**: No
- **Response**:
```json
{
  "success": true,
  "data": ["electronics", "clothing", "books"]
}
```

#### Get Related Products
- **Method**: GET
- **URL**: `/api/products/:id/related`
- **Auth Required**: No
- **Response**: Same as Get All Products

### Shopping Cart

#### Get Cart
- **Method**: GET
- **URL**: `/api/cart`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "data": {
    "items": [],
    "subtotal": 299.97,
    "tax": 30,
    "shipping": 50,
    "total": 379.97
  }
}
```

#### Add to Cart
- **Method**: POST
- **URL**: `/api/cart/items`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

#### Update Cart Item
- **Method**: PUT
- **URL**: `/api/cart/items/:itemId`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "quantity": 2
}
```

#### Remove from Cart
- **Method**: DELETE
- **URL**: `/api/cart/items/:itemId`
- **Auth Required**: Yes

#### Clear Cart
- **Method**: DELETE
- **URL**: `/api/cart`
- **Auth Required**: Yes

### Orders

#### Create Order
- **Method**: POST
- **URL**: `/api/orders`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "shippingAddress": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "9876543210",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pincode": "10001"
  },
  "paymentMethod": "paypal",
  "items": []
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-123456",
    "status": "confirmed",
    "total": 379.97
  }
}
```

#### Get Order by ID
- **Method**: GET
- **URL**: `/api/orders/:id`
- **Auth Required**: Yes

#### Get Customer Orders
- **Method**: GET
- **URL**: `/api/orders?page=1&limit=10`
- **Auth Required**: Yes
- **Query Parameters**:
  - `page` (number): Page number
  - `limit` (number): Items per page

#### Cancel Order
- **Method**: POST
- **URL**: `/api/orders/:id/cancel`
- **Auth Required**: Yes

#### Get Order Tracking
- **Method**: GET
- **URL**: `/api/orders/:id/tracking`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "data": {
    "status": "shipped",
    "estimatedDelivery": "2024-01-15",
    "trackingNumber": "123ABC456"
  }
}
```

### Shipping

#### Save Shipping Address
- **Method**: POST
- **URL**: `/api/shipping/addresses`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "fullName": "John Doe",
  "mobileNumber": "9876543210",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001"
}
```

#### Get Shipping Addresses
- **Method**: GET
- **URL**: `/api/shipping/addresses`
- **Auth Required**: Yes

#### Update Shipping Address
- **Method**: PUT
- **URL**: `/api/shipping/addresses/:id`
- **Auth Required**: Yes

#### Delete Shipping Address
- **Method**: DELETE
- **URL**: `/api/shipping/addresses/:id`
- **Auth Required**: Yes

#### Calculate Shipping Cost
- **Method**: POST
- **URL**: `/api/shipping/calculate`
- **Auth Required**: No
- **Request Body**:
```json
{
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "pincode": "10001"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "shippingCost": 50,
    "estimatedDays": 3
  }
}
```

### Payment

#### Process Payment
- **Method**: POST
- **URL**: `/api/payment/process`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "orderId": "order_id",
  "amount": 379.97,
  "paymentMethod": "paypal",
  "paymentToken": "token_from_paypal"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "transactionId": "transaction_id",
    "status": "completed"
  }
}
```

#### Get Payment Status
- **Method**: GET
- **URL**: `/api/payment/:transactionId`
- **Auth Required**: Yes

#### Refund Payment
- **Method**: POST
- **URL**: `/api/payment/:transactionId/refund`
- **Auth Required**: Yes

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server error |

## Rate Limiting

API endpoints are rate-limited:
- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Remaining` indicates remaining requests

## CORS Configuration

Backend should enable CORS for the frontend domain:
```
Access-Control-Allow-Origin: http://localhost:4200 (development)
Access-Control-Allow-Origin: https://yourdomain.com (production)
```

## Pagination

Paginated endpoints follow this format:
- **page**: Current page number (1-indexed)
- **limit**: Number of items per page
- **total**: Total number of items
- **totalPages**: Total number of pages

## Status Values

### Order Status
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Order confirmed
- `processing` - Order being processed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Payment Status
- `pending` - Payment pending
- `processing` - Payment being processed
- `completed` - Payment completed
- `failed` - Payment failed
- `refunded` - Payment refunded

## Examples

### Successful Request
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=12" \
  -H "Authorization: Bearer token_here"
```

### Error Request
```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "wrong"}'
```

Response:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Testing API

Use tools like:
- **Postman**: Popular API testing tool
- **Insomnia**: Lightweight API client
- **cURL**: Command-line tool
- **REST Client**: VS Code extension

## Versioning

Current API Version: **v1**

Future versions will use `/api/v2`, `/api/v3`, etc.

## Support

For API issues or questions:
- Check backend logs
- Verify request format
- Ensure authentication token is valid
- Check rate limiting
