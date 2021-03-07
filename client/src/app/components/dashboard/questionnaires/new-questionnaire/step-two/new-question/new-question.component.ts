import { Component, OnInit } from '@angular/core';
//Form array es para los formularios dinamicos
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer';
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

  ngOnInit() {
    this.addDefaultAnswers()
  }

   addDefaultAnswers(): void{
    this.addAnswer();
    this.addAnswer();
   }

   //cuando se envia el formulario se resetea el formulario
   //tambien reseteamos el el array de formularios  de respuestas
   reset(): void {
     this.newQuestion.reset();
     this.getAnswers.clear();
     this.addDefaultAnswers();
   }

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
    if(this.getAnswers.length == 2){
      this.toastr.error('Debe tener 2 respuestas como');
    }
    else{
      this.getAnswers.removeAt(i);
    }
  }

  setCorrectAnswer(index: number): void{
    this.correctAnswer = index;
  }

  addQuestion(): void{
    //obtenemos el titulo de la pregunta del formulario
    const answerDescription = this.newQuestion.get('title').value;

    //obtenemos el  array de respuestas del formulario
    const questionAnswers = this.newQuestion.get('answers').value;

    //Creamos un array de respuestas
    const arrayAnswers: Answer[] = [];
    
    //creamos un array de a partir de las respuestas del formulario para crear el objeto Question
    //foreach con index
    questionAnswers.forEach((element, index) => {
      let id = index;
      let correct: boolean = (index === element.isCorrect);
      console.log(correct);
      const answer: Answer = new Answer(element.description, correct, id);

      arrayAnswers.push(answer);
    });

    //Creamos el objeto question
    const question: Question = new Question(answerDescription, arrayAnswers);

    console.log(this.correctAnswer);
    console.log(question);

    this.reset();
  }
}
