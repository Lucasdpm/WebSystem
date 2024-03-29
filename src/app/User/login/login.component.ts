import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { OnInit } from '@angular/core';
import { User } from '../../user';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { 
    this.formGroup = formBuilder.group(<User> {
      email: "",
      password: ""
    })

    if (!this.userService.checkLogIn()) {
      return
    }
  }

  isInvalid: boolean = false

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  logIn() {
    let user: User = <User>this.formGroup.value 
    
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].email === user.email && this.userList[i].password	=== user.password) {
        
        localStorage.setItem('user', JSON.stringify(this.userList[i]))
        this.userService.loggedUser()

        this.router.navigate(['/home'])
      
        this.isInvalid = false 
      }
    }

    this.isInvalid = true
  }
}

