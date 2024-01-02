import { Injectable } from '@angular/core';
import { User } from './user';
import { Access } from './access';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users'
  constructor (private httpClient: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  addUser(newUser: User){
    this.httpClient.post<User>(this.url, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
