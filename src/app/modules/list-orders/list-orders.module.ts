import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrdersRoutingModule } from './list-orders-routing.module';


console.warn('ListOrders module loaded')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListOrdersRoutingModule
  ]
})
export class ListOrdersModule { }
