import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { UserService } from '../../user.service';
import { Access } from '../../access';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productId: number = Number.parseInt(this.router.url.slice(9))
  formGroup: FormGroup = <FormGroup>{}
  submitted = false

  constructor(private productService: ProductService, private formBuilder:FormBuilder, private router: Router, private userService: UserService) {
      this.formGroup = this.formBuilder.group({
        id: '',
        name: '',
        price: '',
        weight: '',
        description: '',
        storage: ''
      })

    if (!this.userService.checkLogIn()) {
      return
    }

    this.initFormProductDetails()
  }
  
  initFormProductDetails() {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.formGroup = this.formBuilder.group({
        id: [product.id],
        name: [product.name, [Validators.required, Validators.minLength(5)]],
        price: [product.price],
        weight: [product.weight, [this.weightValidator]],
        description: [product.description],
        storage: [product.storage, [this.storageValidator]]
      })
    })
  }
  
  weightValidator(control: AbstractControl) {
    const weightRegex = /^\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
    const weight = control.value

    const valid = weightRegex.test(weight) || !weight.length
    return valid ? null : {weightValidator: true}
  }

  storageValidator(control: AbstractControl) {
    const storageRegex = /^\d+$/
    const storage = control.value

    const valid = storageRegex.test(storage) || !storage.length
    return valid ? null : {storageValidator: true}
  }

  submit() {
    this.submitted = true

    if (this.formGroup.invalid) {
      return
    }

    if (this.formGroup.value.price === null || this.formGroup.value.price === '') {
      this.formGroup.patchValue({
        price: 0
      })
    }

    if (!this.formGroup.value.weight.length) {
      this.formGroup.patchValue({
        weight: 0
      })
    }

    if (!this.formGroup.value.description.length) {
      this.formGroup.patchValue({
        description: ''
      })
    }

    if (!this.formGroup.value.storage.length) {
      this.formGroup.patchValue({
        storage: 0
      })
    }
    this.productService.updateProduct(this.productId, this.formGroup.value).subscribe(() => {
      this.router.navigate(['/productManagement'])
    })
  }

  userPermition(): boolean {
    if (this.userService.checkAccess() === Access.user) {
      return true
    }
    return false
  }

  delete() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.router.navigate(['/productManagement'])
    })
  }
}
