import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'add', component: AddEditProductComponent },
  { path: 'edit/:id', component: AddEditProductComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}