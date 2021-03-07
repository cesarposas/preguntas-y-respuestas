export class Answer{
    id?: number;
    title: string;
    isCorrect: boolean;

    constructor(title: string, isCorrect: boolean, id?: number){
        this.id = id;
        this.title = title;
        this.isCorrect = isCorrect;
    }
}