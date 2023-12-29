import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users'
  
  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url)
    return await data.json() ?? []
  }
}
