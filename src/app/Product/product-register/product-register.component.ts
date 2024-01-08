import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from '../../product';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.css'
})
export class ProductRegisterComponent {
  
  productList : Product[] = []
  formGroup: FormGroup

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.formGroup = formBuilder.group(<Product> {
      name: "",
      price: 0,
      weight: 0,
      description: "",
      storage: 0
    })
    
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data
    })
  }

  invalidName(): boolean{
    if(this.formGroup.value.name.length < 5) return true
    return false
  }

  registerProduct(): boolean {
    if (this.formGroup.value.storage === null) {
      this.formGroup.patchValue({
        storage: 0
      })
    }
    this.productService.addProduct(this.formGroup.value).subscribe(product => {
      this.productList.push(product)
    })
    this.router.navigate(['/productManagement'])
    return true;
  }
}
