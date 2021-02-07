import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  login: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, 
    private toastr: ToastrService, 
    private router: Router,
    private loginService: LoginService) { 
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  log(): void {
    console.log(this.login);
    const user: User = {
      userName: this.login.value.username,
      password: this.login.value.password
    }
    this.loading = true;
    this.loginService.login(user).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.router.navigate(['/dashboard']);
      this.loginService.setLocalStorage(user.userName);
    }, error=>{
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    });
  }

}
