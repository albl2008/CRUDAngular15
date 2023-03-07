import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Product } from 'src/app/interfaces/product';
import { Skeleton } from 'src/app/interfaces/skeleton';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.css'],
  })
export class AddEditOrderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean = false;
  orderId: string = ''
  operation: string = 'Agregar ';
  products?: any[]
  product?: any
  productsArray?: any[] = []
  quantityArray?: any[] = []
  quantity?: any
  added: boolean = false;
  subscriptionP: Subscription;
  subscriptionQ: Subscription;

  
  constructor(
    private fb: FormBuilder,
    private _orderService: OrderService,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private productDialog: MatDialog
  ) {
    this.form = this.fb.group({
      client: ['', Validators.required],
      description: ['', Validators.required],
      total: [null, Validators.required],
      type: ['', Validators.required],
      obs: [''],
      products:[''],
      quantity: [0],
      date:['']
    });
    this.orderId = String(aRouter.snapshot.paramMap.get('id'));
    this.subscriptionP = this._productService.getProductOrder().subscribe(product => {
      this.productsArray?.push(product)
    })
    this.subscriptionQ = this._productService.getProductQty().subscribe(quantity => {
      this.quantityArray?.push(quantity)
    })
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

  ngOnDestroy(): void {
    this.subscriptionP.unsubscribe()
    this.subscriptionQ.unsubscribe()
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
        quantity: data.quantity,
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

  openProductDialog(){
    this.productDialog.open(AddProductComponent)
    
  }

 

  addOrder() {
    const order: Order = {
      client: this.form.value.client,
      description: this.form.value.description,
      total: this.form.value.total,
      type: this.form.value.type,
      obs: this.form.value.obs,
      products: this.productsArray,
      quantity: this.quantityArray,
      date: this.form.value.date
    };
    this.loading = true;
    console.log(order)
    if (this.orderId !== 'null') {
      //editar
      this._orderService.updateOrder(this.orderId, order).subscribe(() => {
        this.toastr.info(
          `Order by ${order.client} actualizado correctamente`,
          'Actualizado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    } else {
      //agregar
      this._orderService.saveOrder(order).subscribe(() => {
        this.toastr.success(
          `Order by ${order.client} agregado correctamente`,
          'Agregado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}