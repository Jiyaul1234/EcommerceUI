import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, CartService, NotificationService } from '@core/services';
import { ProductCardComponent } from '@shared/components/product-card.component';
import { Product } from '@shared/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  latestProducts: Product[] = [];
  categories: string[] = [];
  searchQuery = '';
  selectedCategory = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadLatestProducts();
    this.loadCategories();
  }

  loadLatestProducts(): void {
    this.productService.getProducts(1, 8).subscribe({
      next: (response) => {
        this.latestProducts = response;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.notificationService.showError('Failed to load products');
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.notificationService.showSuccess(`${product.name} added to cart!`);
  }

  onViewDetails(productId: string): void {
    // Navigation handled by routing
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Navigate to products page with search query
    }
  }
}
