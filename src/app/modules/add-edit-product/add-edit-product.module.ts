import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditProductRoutingModule } from './add-edit-product-routing.module';


console.warn('add-edit module loaded')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddEditProductRoutingModule
  ]
})
export class AddEditProductModule { }
