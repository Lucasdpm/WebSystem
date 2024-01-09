import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Access } from '../../access';
import { Router } from '@angular/router';
import { Console } from 'console';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { 
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, this.passwordValidator]],
      cpf: ['', Validators.required],
      access: <Access>Access.user
    })
  
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  emailValidator(control: AbstractControl) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const email = control.value

    const valid = emailRegex.test(email)
    return valid ? null : {emailValidator: true}
  }

  cpfValidator(control: AbstractControl) {
    const cpf = control.value
    var valid: boolean = true

    this.userList.forEach(user => {
      if (user.cpf === cpf) valid = false;
    })
    return valid ? null : {cpfValidator: true}
  }

  passwordValidator(control: AbstractControl) {
    const password = control.value

    if (password.length < 8 && password.length) return {passwordValidator: true}

    let hasLetter = /[a-zA-Z]/.test(password)
    let hasNumber = /\d/.test(password)
    let hasNonalphas = /[!@#$%*,.;:/?-_]/.test(password)

    const valid = hasLetter && hasNumber && hasNonalphas && password.length || !password.length
    return valid ? null : {passwordValidator: true}
  }

  cpfValidatorr(): boolean {
    var alreadyRegistered: boolean = false
    this.userList.forEach(user => {
      if(user.cpf === this.formGroup.value.cpf) alreadyRegistered = true
    })
    if (alreadyRegistered) return true
    return false
  }

  registerUser(): boolean {
    if(this.formGroup.invalid) return false
    this.userService.addUser(this.formGroup.value).subscribe(user => {
      this.userList.push(user)
    })
    this.router.navigate(['/login'])
    return true;
  }









  isFieldValid(field: string) {
    return !this.formGroup.get(field)?.valid && this.formGroup.get(field)?.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset(){
    this.formGroup.reset();
  }
}