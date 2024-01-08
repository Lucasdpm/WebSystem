import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrl: './user-description.component.css'
})
export class UserDescriptionComponent {

  userList: User[] = []
  userId: number = Number.parseInt(this.router.url.slice(6))

  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder:FormBuilder, private router: Router) { 
    this.formGroup = this.formBuilder.group({
      name: "",
      email: "",
      cpf: "",
      access: ""
    })
    
    if (!this.userService.checkLogIn()) {
      return
    }

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
      this.formUserDetails()
    })
  }

  formUserDetails() {
    let userDetail: User = <User>{}
    this.userService.getUserById(this.userId).subscribe(user => {

      this.formGroup = this.formBuilder.group({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        access: user.access
      })
    })
  }

  userPermition(): boolean {
    if (this.userService.checkAccess() == 1) {
      return true
    }
    return false
  }

  invalidEmail(): boolean{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let input: string = this.formGroup.value.email
    let found: boolean = emailRegex.test(input)
    if (!found && input.length) {
      return true
    }
    return false
  }

  invalidAccess() {
    const accesRegex = /^[0-2]$/;

    let input: string = this.formGroup.value.access
    let found: boolean = accesRegex.test(input)
    if (!found && input.length) {
      return true
    }
    return false
  }

  submit() {
    this.userService.updateUser(this.userId, this.formGroup.value).subscribe(user => {
      this.userList[this.userId] = user
    })
    this.router.navigate(['/userManagement'])
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe()
    this.router.navigate(['/userManagement'])
  }
}
