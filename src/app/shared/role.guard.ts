import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  user: any;
  role: any;
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private route: Router,
    private aRouter: ActivatedRoute
  ){
  }
  canActivate() {
    this.role = this._authService.getUserRole()
    if (this.role == 'admin'){
      return true;
    } else{
      return false;
    }
    
  }
  
}
