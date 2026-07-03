import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, CartService, NotificationService } from '@core/services';
import { ProductCardComponent } from '@shared/components/product-card.component';
import { Product } from '@shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  currentPage = 1;
  pageSize = 12;
  totalProducts = 0;
  
  selectedCategory = '';
  sortBy = '';
  searchQuery = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    //this.loadCategories();
  }

loadProducts(): void {

  this.productService.getProducts(
    this.currentPage,
    this.pageSize,
    this.selectedCategory,
    this.sortBy,
    this.searchQuery
  ).subscribe({
    next: (response) => {

      console.log(Array.isArray(response)); // true
      console.log(response);

      this.products = response;
      this.totalProducts = response.length;

      console.log('Products loaded:', this.products);
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

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  onAddToCart(product: Product): void {

    this.cartService.addToCart(product, 1);
    this.notificationService.showSuccess(`${product.name} added to cart!`);
  }

  onViewDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }
  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
