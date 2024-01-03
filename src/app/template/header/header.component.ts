import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  logedUserName: string = ''
  constructor(private userService: UserService) { }

  setNameText() {
    this.logedUserName = this.userService.getUserName()
    console.log("teste: " + this.logedUserName)
  }
}
