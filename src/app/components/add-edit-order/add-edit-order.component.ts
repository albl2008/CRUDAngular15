import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { Skeleton } from 'src/app/interfaces/skeleton';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.css'],
})
export class AddEditOrderComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  orderId: string = ''
  operation: string = 'Agregar ';
  products?: any[]
  
  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      client: ['', Validators.required],
      description: ['', Validators.required],
      total: [null, Validators.required],
      type: ['', Validators.required],
      obs: [''],
      products:[''],
      date:['']
    });
    this.orderId = String(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getProducts()
    if (this.orderId === 'null') {
       //estamos agregando
       console.log(this.orderId)
       this.operation = 'Agregar ';
    } else if (this.orderId != '') {
      this.operation = 'Editar ';
      this.getOrder(this.orderId);
    }
  }

  getOrder(id: string) {
    this.loading = true;
    this._orderService.getOrder(id).subscribe((data: Order) => {
      this.loading = false;
      this.form.setValue({
        client: data.client,
        description: data.description,
        total: data.total,
        type: data.type,
        obs: data.obs,
        products: data.products,
        date: data.date
      });
    });
    
  }

  getProducts() {
    this._productService.getListProducts().subscribe((data: Skeleton) => {
      this.products = data.results
    });
    
  }

 

  addOrder() {
    const order: Order = {
      client: this.form.value.client,
      description: this.form.value.description,
      total: this.form.value.total,
      type: this.form.value.type,
      obs: this.form.value.obs,
      products: this.form.value.products,
      date: this.form.value.date
    };
    
    this.loading = true;
    if (this.orderId !== 'null') {
      //editar
      this._orderService.updateOrder(this.orderId, order).subscribe(() => {
        this.toastr.info(
          `Ordero ${order.client} actualizado correctamente`,
          'Actualizado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    } else {
      //agregar
      this._orderService.saveOrder(order).subscribe(() => {
        this.toastr.success(
          `Ordero ${order.client} agregado correctamente`,
          'Agregado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}