import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any{
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token'));
    console.log(decodedToken);

    return decodedToken;
  }

  removeLocalStorage(): void{
    localStorage.removeItem('token');
  }

  
  changePassword(changePassword): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + '/ChangePassword', changePassword)
  }
}
