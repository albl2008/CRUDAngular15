import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthUser }  from '../interfaces/auth';
import { User }  from '../interfaces/user';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;
  private myApiUrl2: string;
  private tokens: any;

  constructor(private http: HttpClient, private route: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'auth/login/';
    this.myApiUrl2 = 'auth/register/';
    
  }

  // register, login, logout

  logIn(user: AuthUser): Observable<any> {
    return this.http.post<AuthUser>(this.myAppUrl + this.myApiUrl, user);
  }

  logOut() {
    window.localStorage.setItem('access','');
    window.localStorage.setItem('refresh','');
    window.localStorage.setItem('id','');
    this.route.navigate(['login'])
  }

  registry(user: User): Observable<any> {
    return this.http.post<User>(this.myAppUrl + this.myApiUrl2, user);
  }

  getUserRole(){
    return localStorage.getItem('role')||'';
  }
  
  isLoggedIn(){
    return localStorage.getItem('access')!='';
  }

  getAccessToken(){
    return localStorage.getItem('access') || '';
  }

  refreshToken() {
    return this.http.post(this.myApiUrl + 'refreshtoken', { }, httpOptions);
  }


}