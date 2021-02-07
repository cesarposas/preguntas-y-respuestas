import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { LoginComponent } from '../../inicio/login/login.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  loading: boolean; 

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private toastr: ToastrService,
              private router: Router) { 
    this.loading = false;
    this.changePassword = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkPassword})
  }

  checkPassword(group: FormGroup): any{
    const newPassword = group.controls.newPassword.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return newPassword === confirmPassword? null: {notSame:true}
  }

  savePassword(): void {
    const changePassword: any = {
      oldPassword: this.changePassword.value.oldPassword,
      newPassword: this.changePassword.value.newPassword
    };
    this.loading = true;
    debugger;
    this.loginService.changePassword(changePassword).subscribe(data =>{
      this.toastr.info(data.message)
      this.router.navigate(['/dashboard']);
    }, error =>{
      this.loading = false; 
      this.changePassword.reset();
      this.toastr.error(error.error.message, "Error");
    });
  }

  ngOnInit(): void {
  }

}
