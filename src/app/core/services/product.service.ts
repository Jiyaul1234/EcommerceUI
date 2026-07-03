import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl =    `http://localhost:5166/api/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(
  
    page: number = 1,
    pageSize: number = 12,
    category?: string,
    sortBy?: string,
    search?: string
  ): Observable<Product[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (category) {
      params = params.set('category', category);
    }
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (search) {
      params = params.set('search', search);
    }
    console.log('Fetching products with params:', params.toString());
   return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

  getRelatedProducts(productId: string, limit: number = 4): Observable<Product[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<Product[]>(`${this.apiUrl}/${productId}/related`, { params });
  }
}
