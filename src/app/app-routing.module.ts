import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
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