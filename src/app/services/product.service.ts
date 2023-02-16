import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Products } from '../interfaces/products';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'products/';
  }
  getListProducts(): Observable<Products> {
    return this.http.get<Products>(this.myAppUrl + this.myApiUrl);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, product);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id);
  }

  updateProduct(productId: string, product: Product): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + productId, product);
  }
}