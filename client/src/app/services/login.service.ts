import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string;
  myApiUrl: string; 

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/login';
  }

  login(user: User): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

  setLocalStorage(data): void {
    localStorage.setItem('username', data);
  }

  getUsername(): string{
    return localStorage.getItem('username');
  }

  removeLocalStorage(): void{
    localStorage.removeItem('username');
  }

  
  changePassword(changePassword): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/ChangePassword', changePassword)
  }
}
