import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  login: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) { 
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
    setTimeout(()=>{
      if(user.userName == 'csarrion' && user.password =='1234'){
        this.router.navigate(['/dashboard']);
      }
      else{ 
        this.toastr.error('usuario o contraseña incorrecto', 'Error');
      }
      this.loading = false;

      console.log(user)
    }, 3000)

  }

}
