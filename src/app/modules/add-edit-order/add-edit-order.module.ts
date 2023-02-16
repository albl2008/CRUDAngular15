import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditOrderRoutingModule } from './add-edit-order-routing.module';


console.warn('add-edit module loaded')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddEditOrderRoutingModule
  ]
})
export class AddEditOrderModule { }
