import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { User } from '../user';
import { Access } from '../access';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  userList : User[] = []
  formGroup: FormGroup
  constructor(private userService: UserService, private formBuilder: FormBuilder, 
    private router: Router, private route: ActivatedRoute) { 
    this.formGroup = formBuilder.group(<User> {
      email: "admin@admin.com.br",
      password: "admin"
    })
  }
  
  logedUser: User = <User>{}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  logIn(): boolean {
    let user: User = <User>this.formGroup.value 

    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].email === user.email) {
        if (this.userList[i].password	=== user.password) {

          localStorage.setItem('user', JSON.stringify(this.userList[i]))
          this.router.navigate(['../home'], { relativeTo: this.route})
          return true
        }
      }
    }
    return false
  }
}
