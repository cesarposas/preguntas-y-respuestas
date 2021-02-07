import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {
  username: string; 


  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(): void{
    console.log(this.loginService.getTokenDecoded());
    this.username = this.loginService.getTokenDecoded().sub;
  }
}
