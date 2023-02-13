import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { Users } from 'src/app/interfaces/users';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class ListUsersComponent implements OnInit {
  listUsers: any;
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {
    let nombre
    this.loading = true;
    this._userService.getListUsers().subscribe((data: Users) => {
      this.listUsers = data.results;
      this.loading = false;
      console.log(data)
    });
  }
  deleteUser(id: string) {
    this.loading = true;
    this._userService.deleteUser(id).subscribe(() => {
      this.getListUsers();
      this.toastr.warning('El usuario fue eliminado', 'Usuario Eliminado');
    });
  }
}