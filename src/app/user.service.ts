import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';


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

  user = new BehaviorSubject<User>(<User>{});

  constructor (private httpClient: HttpClient, private localStorageService: LocalStorageService) { 
    this.userIslogged()
  }

  userIslogged() {
    // verificar no localstoreage
    if(this.localStorageService.get('user')) {

    }
    // setar para memoria (user.setUser())
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getUserById(id: number): Observable<User>{
    const url = `${this.url}/${id}`
    return this.httpClient.get<User>(url)
  }

  addUser(newUser: User): Observable<any>{
    return this.httpClient.post<User>(this.url, newUser, this.httpOptions)
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.delete(url, this.httpOptions)
  }

  updateUser(id: number, updateUser: User): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.put(url, updateUser, this.httpOptions)
  }

  setUser(user: User) {
    this.user.next(user);
  }

  getUser(): User {
    return this.user.value;
  }
}
