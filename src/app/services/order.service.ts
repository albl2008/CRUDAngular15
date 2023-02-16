import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment1 } from 'src/environments/environment';
import { Order } from '../interfaces/order';
import { Skeleton } from '../interfaces/skeleton';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment1.endpoint;
    this.myApiUrl = 'orders/';
  }
  getListOrders(): Observable<Skeleton> {
    return this.http.get<Skeleton>(this.myAppUrl + this.myApiUrl);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveOrder(order: Order): Observable<void> {
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, order);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(this.myAppUrl + this.myApiUrl + id);
  }

  updateOrder(orderId: string, order: Order): Observable<void> {
    return this.http.patch<void>(this.myAppUrl + this.myApiUrl + orderId, order);
  }
}