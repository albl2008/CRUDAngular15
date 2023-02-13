import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User }  from '../interfaces/user';
import { Users }  from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    
    this.myApiUrl = 'users/';
  }
  getListUsers(): Observable<Users> {
    return this.http.get<Users>(this.myAppUrl + this.myApiUrl);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.myAppUrl + this.myApiUrl, user);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.myAppUrl + this.myApiUrl + id);
  }

  updateUser(id: string, product: User): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
}