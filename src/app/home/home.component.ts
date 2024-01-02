import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  userList : User[] = []
  userName: string = ''
  numUsers: number = 0
  numProducts: number = 0

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
      this.numUsers = this.userList.length
    })
  }

  userManagement() {
    this.router.navigate(['/userManagement'])
  }

  productManagement() {
    this.router.navigate(['/productManagement'])
  }
}
