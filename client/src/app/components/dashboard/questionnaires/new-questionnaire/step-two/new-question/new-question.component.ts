import { Component, OnInit } from '@angular/core';
//Form array es para los formularios dinamicos
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  newQuestion: FormGroup;
  question: Question;
  correctAnswer= 0;

  
  constructor(private fb: FormBuilder,
    private toastr: ToastrService){
    this.newQuestion = this.fb.group({
      title: ['', Validators.required],
      //array de formgroups
      answers: this.fb.array([])
    })
  }

  ngOnInit() { }

  //Getter de la clase. newQuestion.Answers
  get getAnswers(): FormArray{
    return this.newQuestion.get('answers') as FormArray;
  }

  addAnswer(): void{
    this.getAnswers.push(this.fb.group({
      description: ['', Validators.required],
      isCorrect: 0
    }))
  }

  deleteAnswer(i: number): void{
    this.getAnswers.removeAt(i);
  }
}
