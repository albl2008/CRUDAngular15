import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistryComponent } from './components/registry/registry.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';


const routes: Routes = [
  { path: '', component:HomeComponent, canActivate:[AuthGuard]},
  { path: 'registry', component:RegistryComponent},
  { path: 'login', component:LoginComponent},
  { path: 'usersList', loadChildren:()=>import('../app/modules/users/users.module').then(mod=>mod.UsersModule), canActivate:[RoleGuard]},
  { path: 'orderList', loadChildren:()=>import('../app/modules/list-orders/list-orders.module').then(mod=>mod.ListOrdersModule), canActivate:[RoleGuard] },
  { path: 'addOrder', loadChildren:()=>import('../app/modules/add-edit-order/add-edit-order.module').then(mod=>mod.AddEditOrderModule), canActivate:[RoleGuard] },
  { path: 'editOrder/:id', loadChildren:()=>import('../app/modules/add-edit-order/add-edit-order.module').then(mod=>mod.AddEditOrderModule), canActivate:[RoleGuard] },
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