import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Access } from '../../access';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { 
    this.formGroup = formBuilder.group(<User> {
      name: '',
      email: '',
      password: '',
      cpf: '',
      access: <Access>Access.user
    })
  
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  invalidEmail(): boolean{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let input: string = this.formGroup.value.email
    let found: boolean = emailRegex.test(input)
    if (!found && input.length) {
      return true
    }
    var areadyRegistered: boolean = false
    this.userList.forEach(user => {
      if(user.email === this.formGroup.value.email) areadyRegistered = true
    })
    if (areadyRegistered) return true
    return false
  }

  invalidCpf(): boolean {
    var alreadyRegistered: boolean = false
    this.userList.forEach(user => {
      if(user.cpf === this.formGroup.value.cpf) alreadyRegistered = true
    })
    if (alreadyRegistered) return true
    return false
  }

  invalidPassword(): boolean{
    let input: string = this.formGroup.value.password

    if (input.length < 8 && input.length) return true

    let hasLetter = /[a-zA-Z]/.test(input)
    let hasNumber = /\d/.test(input)
    let hasNonalphas = /[!@#$%*,.;:/?-_]/.test(input)

    if (hasLetter && hasNumber && hasNonalphas && input.length || !input.length) return false
    return true
  }

  registerUser(): boolean {
    this.userService.addUser(this.formGroup.value).subscribe(user => {
      this.userList.push(user)
    })
    this.router.navigate(['/login'])
    return true;
  }
}

