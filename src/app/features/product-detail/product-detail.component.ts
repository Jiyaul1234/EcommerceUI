import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, CartService, NotificationService } from '@core/services';
import { ProductCardComponent } from '@shared/components/product-card.component';
import { Product } from '@shared/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  quantity = 1;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProduct(params['id']);
    });
  }

  loadProduct(id: string): void {
    alert("Hello product details")
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.selectedImage = product.image;
        this.loadRelatedProducts(id);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.notificationService.showError('Failed to load product');
      }
    });
  }

  loadRelatedProducts(productId: string): void {
    this.productService.getRelatedProducts(productId).subscribe({
      next: (products) => {
        this.relatedProducts = products;
      },
      error: (err) => {
        console.error('Error loading related products:', err);
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.notificationService.showSuccess(`${this.product.name} added to cart!`);
    }
  }

  buyNow(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.router.navigate(['/checkout']);
    }
  }

  onRelatedProductAddToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.notificationService.showSuccess(`${product.name} added to cart!`);
  }

 
}
