import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListUsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate:[AuthGuard]},
  { path: 'registry', component:RegistryComponent},
  { path: 'login', component:LoginComponent},
  { path: 'usersList', component: ListUsersComponent, canActivate:[RoleGuard]},
  { path: 'productlist', loadChildren:()=>import('../app/modules/list-product/list-product.module').then(mod=>mod.ListProductModule) },
  { path: 'add', loadChildren:()=>import('../app/modules/add-edit-product/add-edit-product.module').then(mod=>mod.AddEditProductModule) },
  { path: 'edit/:id', loadChildren:()=>import('../app/modules/add-edit-product/add-edit-product.module').then(mod=>mod.AddEditProductModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}