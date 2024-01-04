import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  logedUserName: string = ''
  constructor(private userService: UserService, private router: Router) {
    
   }

  ngOnInit() {
    //this.logName()
  }

  logName() {
      this.userService.user.subscribe((value: User) => {
        this.logedUserName = value.name;
        //console.log(this.userService.getUser())

      })
  }

  logOf() {
    localStorage.clear()
    this.logName()
    this.router.navigate(['/login'])
  }
}
