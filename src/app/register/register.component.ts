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


  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  //TODO
  verifyEmail(): boolean{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let input: string = this.formGroup.value.email
    let found: boolean = emailRegex.test(input)
    if (!found && input.length) {
      return true
    }
    return false
  }

  //TODO
  verifyPassword(): boolean{
    let input: string = this.formGroup.value.password
    console.log(input.length)
    if (input.length < 8 && input.length) return true
    console.log("teste")
    let hasLetter = /[a-zA-Z]/.test(input)
    let hasNumber = /\d/.test(input)
    let hasNonalphas = /[!@#$%*,.;:/?-_]/.test(input)

    if (hasLetter && hasNumber && hasNonalphas && input.length || !input.length) return false
    return true
  }

  registerUser(): boolean {
    this.userService.addUser(this.formGroup.value).subscribe(user => {
      this.userList.push(user)
      console.log(user)
    })
    return true;
  }
}

