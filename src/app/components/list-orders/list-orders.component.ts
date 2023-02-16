import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/interfaces/order';
import { Skeleton } from 'src/app/interfaces/skeleton';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
})
export class ListOrdersComponent implements OnInit {
  listOrders: any;
  loading: boolean = false;

  constructor(
    private _orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListOrders();
  }

  getListOrders() {
    this.loading = true;
    this._orderService.getListOrders().subscribe((data: Skeleton) => {
      this.listOrders = data.results;
      this.loading = false;
      console.log(data)
    });
  }
  deleteOrder(id: string) {
    this.loading = true;
    this._orderService.deleteOrder(id).subscribe(() => {
      this.getListOrders();
      this.toastr.warning('El ordero fue eliminado', 'Ordero Eliminado');
    });
  }
}