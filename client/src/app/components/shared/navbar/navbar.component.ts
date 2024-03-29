import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../../inicio/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private LoginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut(): void{
    console.log('yw');
    this.LoginService.removeLocalStorage();
    this.router.navigate(['/inicio']);
  }

}
