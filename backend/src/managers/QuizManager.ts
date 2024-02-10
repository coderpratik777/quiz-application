import { AllowedSubmissions, Quiz } from "../Quiz";
import { IoManager } from "./IoManager";
let globalProblemId = 0;


export class QuizManager {
    private quizes: Quiz[];

    constructor(){
        this.quizes = [];
    }

    public addProblem(roomId: string, problem : {
        title: string;
        description: string;
        image?: string;
        answer: AllowedSubmissions;
        options: {
            id: number,
            title: string
        }[]
    } ) {
        const quiz = this.getQuiz(roomId);
        if(!quiz) { 
            return ;
        }

        quiz.addProblem(roomId,{
            ...problem,
            id: (globalProblemId++).toString(),
            startTime: new Date().getTime(),
            submission:[]
        });

    }

    public start(roomId: string){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return;
        }
        quiz.start();
    }

    public next(roomId: string){
        const quiz = this.getQuiz(roomId);
        if(!quiz){
            return;
        }
        quiz.next();    
    }

    addUser(roomId: string,name : string){
        return this.getQuiz(roomId)?.addUser(name);
    }

    submit(roomId: string, problemId: string, submission: 0|1|2|3, userId: string){
        this.getQuiz(roomId)?.submit(roomId,problemId,submission,userId);
    }

    getQuiz(roomId: string){
        return this.quizes.find(x => x.roomId === roomId);
    }

    getCurrentState(roomId:string){
        const quiz = this.quizes.find(x => x.roomId === roomId)
        console.log("quiz not found for quiz id ",quiz)
        if(!quiz){
             return null;
        }

        return quiz.getCurrentState();
    }

    addQuiz(roomId:string){
        const quiz = new Quiz(roomId);
        this.quizes.push(quiz);
    }
}