import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditOrderComponent } from 'src/app/components/add-edit-order/add-edit-order.component';

const routes: Routes = [
  {path:'', component: AddEditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditOrderRoutingModule { }
