import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { User } from '../user';
import { Access } from '../access';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group(<User> {
      email: "",
      password: ""
    })
  }
  
  logedUser: User = <User>{}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  logIn() {

  }
}
