import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { Access } from '../access';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group(<User> {
      name: "",
      email: "",
      password: "",
      cpf: "",
      access: <Access>Access.user
    })
  }

  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}[#.?!@$%^&*-]$/

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  verifyEmail(): boolean{
    let input: string = this.formGroup.value.email
    let found: boolean = this.emailRegex.test(input)
    if (!found && input.length) {
      return true
    }
    return false
  }

  verifyPassword(): boolean{
    let input: string = this.formGroup.value.password
    let found: boolean = this.passwordRegex.test(input)
    if (!found && input.length) {
      return true
    }
    return false
  }

  registerUser(): boolean {
    this.userService.addUser(this.formGroup.value)
    return true;
  }
}

