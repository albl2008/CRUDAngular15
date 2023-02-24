import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { Skeleton } from 'src/app/interfaces/skeleton';
import { ProductService } from 'src/app/services/product.service';
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
    private _productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListOrders();
  }

  getListOrders() {
    this.loading = true;
    this._orderService.getListOrders().subscribe((data: Skeleton) => {
      this.listOrders = data.results
      this.getProductName(this.listOrders[1].products[1])
      console.log(this.listOrders.length)
      for (var i=0 ; i<this.listOrders.length; i++){
        if (this.listOrders[i].products[0]!=null && this.listOrders[i].products[2]!= ''){
          this.listOrders[i].products[0]=this.getProductName(this.listOrders[i].products[0])
        }
        
        if (this.listOrders[i].products[1]!=null && this.listOrders[i].products[1]!= ''){
          this.listOrders[i].products[1]=this.getProductName(this.listOrders[i].products[1])
        }
      }

      this.loading = false;
    });
  }
  getProductName(id: string) {
    let productName
    this._productService.getProduct(id).subscribe((data: Product)=>{
      productName = data.name
      console.log(data.name)
    })
    return productName
   
  }


  deleteOrder(id: string) {
    this.loading = true;
    this._orderService.deleteOrder(id).subscribe(() => {
      this.getListOrders();
      this.toastr.warning('El ordero fue eliminado', 'Ordero Eliminado');
    });
  }
}