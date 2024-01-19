import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { Access } from './access';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  url = `${environment.MainUrl}/user`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  user = new BehaviorSubject<User>(<User>{})

  constructor (private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
    this.loggedUser()
    console.log(this.url)
  }

  logIn() {
    
  }

  checkLogIn(): boolean {
    if (this.localStorageService.get(`user`) === null) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }

  checkAccess(): Access {
    return this.localStorageService.get(`user`).access
  }

  loggedUser() {
    this.user.next(this.localStorageService.get(`user`))
  }

  signOut() {
    this.localStorageService.clear()
    this.user.next(<User>{})
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
    return this.httpClient.delete(url, {responseType: 'text'})
  }

  updateUser(id: number, updateUser: User): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.put(url, updateUser, this.httpOptions)
  }
}
