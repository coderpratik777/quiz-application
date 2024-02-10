"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const QuizManager_1 = require("./QuizManager");
const ADMIN_PASSWORD = "ADMIN_PASSWORD";
class UserManager {
    constructor() {
        this.quizManager = new QuizManager_1.QuizManager();
    }
    ;
    addUser(socket) {
        this.createHandlers(socket);
    }
    ;
    createHandlers(socket) {
        socket.on("join", (data) => {
            console.log("user joined", data);
            const userId = this.quizManager.addUser(data.roomId, data.name);
            console.log("user added", userId);
            socket.emit("init", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            });
            socket.join(data.roomId);
        });
        socket.on("joinAdmin", (data) => {
            console.log("join admin called ", data);
            if (data.password !== ADMIN_PASSWORD) {
                return;
            }
            const userId = this.quizManager.addUser(data.roomId, data.name);
            socket.emit("adminInit", {
                userId,
                state: this.quizManager.getCurrentState(data.roomId)
            });
            socket.on("createQuiz", data => {
                this.quizManager.addQuiz(data.roomId);
            });
            socket.on("createProblem", (data) => {
                const roomId = data.roomId;
                const problem = data.problem;
                this.quizManager.addProblem(roomId, problem);
            });
            socket.on("start", (data) => {
                console.log("start called", data);
                this.quizManager.start(data.roomId);
            });
            socket.on("next", (data) => {
                this.quizManager.next(data.roomId);
            });
        });
        socket.on("submit", (data) => {
            const userId = data.userId;
            const problemId = data.problemId;
            const submission = data.submission;
            if (submission != 0 || submission != 1 || submission != 2 || submission != 3) {
                console.error("issue while getting the input " + submission);
                return;
            }
            this.quizManager.submit(data.roomId, problemId, submission, userId);
        });
    }
}
exports.UserManager = UserManager;
