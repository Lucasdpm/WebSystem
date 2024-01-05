import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent {

  
  productList: Product[] = []
  productId: number = Number.parseInt(this.router.url.slice(9))
  
  formGroup: FormGroup
  constructor(private productService: ProductService, private formBuilder:FormBuilder, private router: Router) { 
    this.formGroup = this.formBuilder.group({
      name: "",
      price: 0,
      weight: 0,
      description: "",
      storage: 0
    })
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data
      this.formProductDetails()
    })
  }

  formProductDetails() {
    let ProductDetail: Product = <Product>{}
    this.productService.getProductById(this.productId).subscribe(product => {

      this.formGroup = this.formBuilder.group({
        name: product.name,
        price: product.price,
        weight: product.weight,
        description: product.description,
        storage: product.storage
      })
    })
  }

  submit() {
    console.log("submited")
    this.productService.updateProduct(this.productId, this.formGroup.value).subscribe(product => {
      this.productList[this.productId] = product
    })
    this.router.navigate(['/productManagement'])
  }

  delete() {
    this.productService.deleteProduct(this.productId).subscribe()
    this.router.navigate(['/productManagement'])
  }
}
