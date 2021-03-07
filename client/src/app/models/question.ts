import { Answer } from "./answer";

export class Question{
    description: string;
    listAnswer: Answer[];
    hide?: boolean;

    constructor(description: string, listAnswer: Answer[]){
        this.description = description;
        this.listAnswer = listAnswer;
    }
}