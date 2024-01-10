import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted = false

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.formGroup = formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      price: "",
      weight: [null, [this.weightValidator]],
      description: null,
      storage: ["", [this.storageValidator]]
    })
    
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data
    })
  }

  weightValidator(control: AbstractControl) {
    const weightRegex = /^\d*\,?\d+(?:[Ee][\+\-]?\d+)?$/
    const weight = control.value

    const valid = weightRegex.test(weight)
    return valid ? null : {weightValidator: true}
  }

  storageValidator(control: AbstractControl) {
    const storageRegex = /^\d+$/
    const storage = control.value

    const valid = storageRegex.test(storage)
    return valid ? null : {storageValidator: true}
  }
  
  registerProduct(): boolean {
    this.submitted = true

    if (this.formGroup.invalid) {
      return false
    }

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
