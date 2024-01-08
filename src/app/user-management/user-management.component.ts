import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  
  userList: User[] = []
  displayedColumns: string[] = ['name', 'email', 'cpf', "access"];

  constructor(private userService: UserService, private router: Router) {
    if (!this.userService.checkLogIn()) {
      return
    }
    this.userPermition()
    
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    })
  }

  userPermition(): boolean {
    if (this.userService.checkAccess() == 0) {
      this.router.navigate(['/home'])
    }
    return true
  }
}
