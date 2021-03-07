import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { Questionnaire } from 'src/app/models/questionnaire';
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
  loading: boolean = false;

  constructor(private questionnaireService: QuestionnaireService,
              private toastr: ToastrService,
              private router: Router) { 

  
  }

  ngOnInit(): void {
    this.questionnaireTitle = this.questionnaireService.titleQuestionnaire;
    this.questionnaireDescription = this.questionnaireService.descriptionQuestionnaire
  }

  saveQuestion(question: Question): void{
    this.questionList.push(question);
    console.log(this.questionList);
  }

  deleteQuestion(index: number): void{
    this.questionList.splice(index, 1);
  }

  setQuestionHide(index: number): void {
    this.questionList[index].hide = !this.questionList[index].hide;
  }

  saveQuestionnaire(): void{
    let today = new Date();
    const newQuestionnaire: Questionnaire = new Questionnaire(this.questionnaireTitle, this.questionnaireDescription, today, this.questionList);
    this.loading = true;
    //enviamos el questionario al backend
    this.questionnaireService.saveQuestionnaire(newQuestionnaire).subscribe(data => {
      this.toastr.success('Questionario enviado con exito', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error =>{
      this.toastr.error('Error');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    });
  }
}
