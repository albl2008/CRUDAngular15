import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Products } from '../interfaces/products';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productId$  = new Subject<any>()
  private quantity$  = new Subject<any>()
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

  sendProduct(id:any,quantity:number){
    this.productId$.next(id)
    this.quantity$.next(quantity)
  }

  getProductOrder(): Observable<any>{
    return this.productId$.asObservable()
  }
  getProductQty(): Observable<any>{
    return this.quantity$.asObservable()
  }

  updateProduct(productId: string, product: Product): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + productId, product);
  }
}