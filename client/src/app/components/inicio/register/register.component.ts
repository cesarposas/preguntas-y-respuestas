import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  loading = false; 
  constructor(private fb: FormBuilder, 
              private userService: UsersService,
              private router: Router,
              private toastr: ToastrService) { 
    this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4)],
      confirmationPassword: ['']
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    const user: User = {
      userName: this.register.value.username,
      password: this.register.value.password
    }
    this.loading = true;
    //me suscribo porque se tiene que quedar esperando mensaje de error
    this.userService.saveUser(user).subscribe(data => {
      console.log(data);
      this.toastr.success('El usuario ' + user.userName + ' fue registrado con exito', 'usuario registrado')
      this.router.navigate(['/inicio/login'])
      this.loading = false;
    }, error => {
      this.loading = false;
      this.register.reset();
      this.toastr.error(error.error.message, 'Error!')
      console.log(error);
    })
  }

  checkPassword(group: FormGroup): any {
    const password =  group.controls.password.value;
    const confirmationPassword = group.controls.confirmationPassword.value;
    return password === confirmationPassword ? null : { notSame: true};
  }

}
