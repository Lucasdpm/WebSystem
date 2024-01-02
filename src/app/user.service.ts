import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users'
  constructor (private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  addUser(newUser: User) {
    this.httpClient.post(this.url, newUser)
  }
}
