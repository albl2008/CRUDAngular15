import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent {
  form: FormGroup;
  id: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    });
    this.id = String(aRouter.snapshot.paramMap.get('id'));
    
  }

  registry() {
    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this._authService.registry(user).subscribe(() => {
      this.toastr.success(
        `Usuario ${user.name} registrado correctamente`,
        'Registro'
      );
      this.router.navigate(['/']);
    },
    (err) => {
      console.log(err)
    }
    );
}

}
