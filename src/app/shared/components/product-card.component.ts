import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewDetails = new EventEmitter<string>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product.id);
  }

  getDiscountPercentage(): number {
    if (this.product.discount) {
      return this.product.discount;
    }
    if (this.product.discountedPrice) {
      return Math.round(((this.product.price - this.product.discountedPrice) / this.product.price) * 100);
    }
    return 0;
  }
}
