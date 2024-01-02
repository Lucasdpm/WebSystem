import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjetoWeb';
  username: string = ""

  userName($event: ($event: any) => void) {
    this.userName = $event
    console.log("teste" + this.userName)
  }
}
