import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skeleton } from 'src/app/interfaces/skeleton';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  productForm: FormGroup;
  products?: any[];
  selected: any;
  quantity?: any;
  product?: any;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,


  ){
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
    })

    

}

ngOnInit(): void {
  this.getProducts()
}

getProducts() {
  this._productService.getListProducts().subscribe((data: Skeleton) => {
    this.products = data.results
  });
  
}

addProductQty(productId, quantity){
  console.log('Set product/quantity')
  console.log(productId,quantity)
  this._productService.sendProduct(productId,quantity)
  
}
}
