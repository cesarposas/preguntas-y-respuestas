import { Answer } from "./answer";

export class Question{
    title: string;
    listAnswer: Answer[];
    hide?: boolean;

    constructor(description: string, listAnswer: Answer[]){
        this.title = description;
        this.listAnswer = listAnswer;
        this.hide = true;
    }
}