import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionnaire } from '../models/questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  titleQuestionnaire: string;
  descriptionQuestionnaire: string;
  myAppUrl: string;
  myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Questionnaire';
   }

   saveQuestionnaire(questionnaire: Questionnaire): Observable<any>{
     return this.http.post(this.myAppUrl + this.myApiUrl, questionnaire);
   }
}
