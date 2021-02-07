import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  myAppUrl: string;
  myApiUrl: string;
  myApiChangePassword: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/User';
  }

  saveUser(user: User): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }
}
