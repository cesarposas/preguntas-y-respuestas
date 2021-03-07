import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  questionnaireTitle: string; 
  questionnaireDescription: string;
  questionList: Question[] = [];

  constructor(private questionnaireService: QuestionnaireService,
              private toastr: ToastrService,
              private router: Router) { 

  
  }

  ngOnInit(): void {
    this.questionnaireTitle = this.questionnaireService.titleQuestionnaire;
    this.questionnaireDescription = this.questionnaireService.descriptionQuestionnaire
  }
}
