import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { Access } from '../access';

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrl: './user-description.component.css'
})
export class UserDescriptionComponent implements OnInit{

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
  }
  
  ngOnInit(): void {
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

  submit() {
    console.log("submited")
    this.userService.updateUser(this.userId, this.formGroup.value).subscribe(user => {
      this.userList[this.userId] = user
      console.log( this.userList[this.userId])
    })
    this.router.navigate(['/userManagement'])
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe()
    this.router.navigate(['/userManagement'])
  }
}
