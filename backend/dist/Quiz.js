"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const IoManager_1 = require("./managers/IoManager");
const PROBLEM_TIM = 10000;
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
        this.debug();
    }
    debug() {
        console.log(this.problems);
        console.log(this.currentState);
        console.log(this.activeProblem);
        console.log(this.roomId);
        console.log(this.users);
    }
    addProblem(roomId, problem) {
        this.problems.push(problem);
        console.log("In add");
        console.log(this.problems);
    }
    start() {
        console.log("start click");
        if (this.hasStarted) {
            return;
        }
        this.currentState = "question";
        this.hasStarted = true;
        this.setActiveProblem(this.problems[0]);
        console.log("In start");
        console.log(this.problems);
    }
    setActiveProblem(problem) {
        console.log("setactive problem !!", JSON.stringify(problem));
        problem.startTime = new Date().getTime();
        problem.submission = [];
        IoManager_1.IoManager.getIo().to(this.roomId).emit("problem", {
            problem
        });
        setTimeout(() => {
            this.sendLeaderBoard();
        }, PROBLEM_TIM);
    }
    sendLeaderBoard() {
        console.log("sending leaderboard");
        this.currentState = "leaderboard";
        const leaderBoard = this.getLeaderboard();
        IoManager_1.IoManager.getIo().to(this.roomId).emit("leaderboard", leaderBoard);
    }
    next() {
        console.log("next click");
        this.currentState = "question";
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        if (problem) {
            this.setActiveProblem(problem);
        }
        else {
            this.activeProblem--;
            // IoManager.getIo().emit("QUIZ_ENDED", {
            //     problem
            // });
        }
    }
    generateString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    addUser(name) {
        const id = this.generateString(7);
        this.users.push({
            name,
            id,
            points: 0
        });
        return id;
    }
    submit(roomId, problemId, submission, userId) {
        const problem = this.problems.find(p => p.id === problemId);
        const user = this.users.find(u => u.id === userId);
        if (!problem || !user) {
            return;
        }
        const existingSolution = problem.submission.find(s => s.userId === userId);
        if (existingSolution) {
            return;
        }
        problem.submission.push({
            problemId,
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission,
        });
        user.points += 1000 - 500 * (new Date().getTime() - problem.startTime) / PROBLEM_TIM;
    }
    getLeaderboard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).splice(0, 20);
    }
    getCurrentState() {
        if (this.currentState === "not_started") {
            return {
                type: "not_started"
            };
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderboard
            };
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderboard
            };
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem
            };
        }
    }
}
exports.Quiz = Quiz;
