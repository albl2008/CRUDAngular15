import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operation: string = 'Agregar ';
  postOn: string[] = ['MercadoLibre','Web','Marketplace','Clasificados']

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      type: ['', Validators.required],
      obs: [''],
      postOn:[''],
      hide:[0],
      dueDate:['']
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      //estamos editando
      this.operation = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        type: data.type,
        obs: data.obs,
        postOn: data.postOn,
        hide: data.hide,
        dueDate: data.dueDate
      });
    });
    
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
      type: this.form.value.type,
      obs: this.form.value.obs,
      postOn: this.form.value.postOn,
      hide: this.form.value.hide,
      dueDate: this.form.value.dueDate
    };
    this.loading = true;
    if (this.id !== 0) {
      //editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(
          `Producto ${product.name} actualizado correctamente`,
          'Actualizado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    } else {
      //agregar
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(
          `Producto ${product.name} agregado correctamente`,
          'Agregado'
        );
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}