import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';


console.warn('list-product module loaded')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListProductRoutingModule
  ]
})
export class ListProductModule { }
