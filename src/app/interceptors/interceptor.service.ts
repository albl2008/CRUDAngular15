import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor { 
  constructor(
    private _authService: AuthService,
  ) { 
    
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this._authService.getAccessToken())
  });

    return next.handle(newReq);
  }
}
