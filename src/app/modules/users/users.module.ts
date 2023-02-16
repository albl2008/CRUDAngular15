import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

console.warn('ListUsers module loaded')
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
