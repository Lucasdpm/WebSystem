import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Access } from '../../access';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  userList: User[] = []
  userId: number = Number.parseInt(this.router.url.slice(6))
  formGroup: FormGroup
  currentEmail: String = ''
  currentCpf: String = ''
  submitted = false

  constructor(private userService: UserService, private formBuilder:FormBuilder, private router: Router) { 
    this.formGroup = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
      cpf: '',
      access: <Access>{}
    })

    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
    this.initFormUserDetails()
  }

  ngOnInit(): void {
    this.userPermition()
  }

  initFormUserDetails() {
    this.userService.getUserById(this.userId).subscribe(user => {

      this.currentEmail = user.email
      this.currentCpf = user.cpf

      this.formGroup = this.formBuilder.group({
        id: [user.id],
        name: [user.name, [Validators.required]],
        email: [user.email, [Validators.required, this.emailValidator]],
        password: [user.password],
        cpf: [user.cpf, [Validators.required]],
        access: [user.access]
      })
    })
  }

  userPermition(): boolean {
    if (this.userService.checkAccess() === Access.mod) {
      return true
    }
    return false
  }

  emailValidator(control: AbstractControl) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const email = control.value

    const valid = emailRegex.test(email)
    return valid ? null : {emailValidator: true}
  }

  accessValidator(control: AbstractControl) {
    const accessRegex = /^[0-2]$/;
    const access = control.value

    const valid = accessRegex.test(access)
    return valid ? null : {emailValidator: true}
  }
  
  emailCheck(): boolean {
    let alreadyRegistered: boolean = false
    this.userList.forEach(user => {
      if (user.email === this.formGroup.value.email) {
        if (this.currentEmail !== this.formGroup.value.email) {
          alreadyRegistered = true
        }
      }
    })
    return alreadyRegistered
  }

  cpfCheck(): boolean {
    var alreadyRegistered: boolean = false
    this.userList.forEach(user => {
      if(user.cpf === this.formGroup.value.cpf) {
        if (this.currentCpf !== this.formGroup.value.cpf) {
          alreadyRegistered = true
        }
      }
    })
    return alreadyRegistered
  }

  submit(): boolean {
    this.submitted = true

    if(this.formGroup.invalid || this.userPermition()) {
      return false
    }

    if(this.cpfCheck() || this.emailCheck()) {
      return false
    }

    this.userService.updateUser(this.userId, this.formGroup.value).subscribe(() => {
      this.router.navigate(['/userManagement'])
    })
    return true
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.router.navigate(['/userManagement'])
    })
  }
}
