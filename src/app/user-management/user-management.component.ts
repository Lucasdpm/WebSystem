import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  
  userList: User[] = []
  displayedColumns: string[] = ['name', 'email', 'cpf', "access"];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }
}
