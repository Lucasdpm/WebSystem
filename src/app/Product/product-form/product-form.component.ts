import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { UserService } from '../../user.service';
import { Access } from '../../access';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productList: Product[] = []
  productId: number = Number.parseInt(this.router.url.slice(9))
  formGroup: FormGroup
  submitted = false

  constructor(private productService: ProductService, private formBuilder:FormBuilder, private router: Router, private userService: UserService) {
    this.formGroup = formBuilder.group(<Product> {
      name: "",
      price: 0,
      weight: 0,
      description: "",
      storage: 0
    })

    if (!this.userService.checkLogIn()) {
      return
    }

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

  invalidName(): boolean{
    if(this.formGroup.value.name.length < 5) return true
    return false
  }

  submit() {
    if (this.formGroup.value.storage === null) {
      this.formGroup.patchValue({
        storage: 0
      })
    }
    this.productService.updateProduct(this.productId, this.formGroup.value).subscribe(product => {
      this.productList[this.productId] = product
    })
    this.router.navigate(['/productManagement'])
  }

  userPermition(): boolean {
    if (this.userService.checkAccess() === Access.user) {
      return true
    }
    return false
  }

  delete() {
    this.productService.deleteProduct(this.productId).subscribe()
    this.router.navigate(['/productManagement'])
  }
}
