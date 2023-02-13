import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _authSerivice: AuthService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this._authSerivice.isLoggedIn()
  }

  logOut(){
    console.log('Logout')
    this._authSerivice.logOut()
    console.log(this.isLoggedIn())
  }

}