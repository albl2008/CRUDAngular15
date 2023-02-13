import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    });
    this.id = String(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    
  }

  
  login() {
    if (this.form.valid){


    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this._authService.logIn(user).subscribe(
      (res) => {
        window.localStorage.setItem("access",res.tokens.access.token)
        window.localStorage.setItem("refresh",res.tokens.refresh.token)
        window.localStorage.setItem("role",res.user.role)
      this.toastr.success(
        `Usuario ${user.email} logueado correctamente`,
        'Login'
      );
      this.router.navigate(['/']);
    },
    (err) => {
      console.log(err)
    }
    );
}
    }


}