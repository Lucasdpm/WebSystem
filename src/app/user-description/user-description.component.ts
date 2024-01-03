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
    let userDetail: User = this.userService.getUserById(this.userId)


    console.log(this.userId)
    console.log(userDetail)


    this.formGroup = this.formBuilder.group({
      name: userDetail.name,
      email: userDetail.email,
      cpf: userDetail.cpf,
      access: userDetail.access
    })
  }


  submit() {
    
  }

  delete() {
    this.userService.deleteUser(this.userId).subscribe()
  }
}
