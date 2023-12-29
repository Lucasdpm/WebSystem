import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

import { User } from '../user';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userService = inject(UserService)
  userList : User[] = []

  constructor() {
    this.userService.getAllUsers().then((userList : User[]) => {
      this.userList = userList
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      console.log(this.userList[i])
    }
  }
}
