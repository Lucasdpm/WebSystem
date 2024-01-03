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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor (private httpClient: HttpClient) { }

  logedUserName: string = ''

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getUserById(id: number): User{
    let getUser: User = <User>{}
    this.httpClient.get<User>(this.url).subscribe((user => {
      if (user.id === id) getUser = user
      //console.log(user)
      //console.log(user.id + " === " + id + "  " + (user.id === id))
    }))
    
    return getUser
  }

  addUser(newUser: User): Observable<any>{
    return this.httpClient.post<User>(this.url, newUser, this.httpOptions)
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    console.log(url)
    return this.httpClient.delete(url, this.httpOptions)
  }

  setUserName(name: string) {
    this.logedUserName = name
  }

  getUserName(): string {
    return this.logedUserName
  }
}
