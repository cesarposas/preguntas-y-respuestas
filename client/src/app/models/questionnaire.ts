
import { Question } from './question';

export class Questionnaire{
    id?: number;
    name: string;
    description: string;
    dataCreation: Date;
    listQuestions: Question[];

    constructor(name: string, description: string, dataCreation: Date, listQuestions: Question[]){
        this.name = name;
        this.description = description;
        this.dataCreation = dataCreation;
        this.listQuestions = listQuestions
    }
}