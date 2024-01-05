import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  userList : User[] = []
  loggedUserName: string = ''
  numUsers: number = 0
  numProducts: number = 0

  constructor(private userService: UserService) {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
      this.userService.user.subscribe((value: User) => this.loggedUserName = value.name)
      this.numUsers = this.userList.length
    })
  }
}
