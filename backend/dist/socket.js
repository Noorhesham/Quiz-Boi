"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid"); // Use uuid for generating unique session ids
const quizController = require("./controllers/quizController");
const socketServer = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    const activeQuizzes = {};
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);
        socket.on("join-quiz", ({ quizId, userName }) => handleJoinQuiz(socket, quizId, userName));
        socket.on("done", ({ sessionId, userName }) => {
            console.log(sessionId, userName);
            handleDone(sessionId, userName);
        });
        socket.on("end-quiz", ({ sessionId, userName }) => handleEndQuiz(sessionId, userName));
        socket.on("send-results", ({ sessionId, userName }) => handleResults(sessionId, userName));
        socket.on("disconnect", () => handleDisconnect(socket));
        socket.on("timeOut", ({ sessionId, userName }) => io.to(sessionId).emit("next-question"));
    });
    const handleJoinQuiz = (socket, quizId, userName) => __awaiter(void 0, void 0, void 0, function* () {
        const tempKey = `${quizId}`;
        if (!activeQuizzes[tempKey]) {
            // If no active quiz, create one and add the current user
            activeQuizzes[tempKey] = { users: [{ socketId: socket.id, userName }] };
            socket.join(tempKey);
            console.log(`${userName} is waiting for an opponent on quiz ${quizId}`);
        }
        else {
            const opponent = activeQuizzes[tempKey].users[0];
            const sessionId = (0, uuid_1.v4)(); // Generate a unique session ID
            const firstUserId = opponent.socketId;
            const secondUserId = socket.id;
            // Create a new session for the two users
            activeQuizzes[sessionId] = {
                users: [opponent, { socketId: socket.id, userName }],
                currentQuestion: 0,
                answers: {},
                doneCount: 0,
                resultsCount: 0,
            };
            // Make both sockets join the session room
            socket.join(sessionId);
            const opponentSocket = io.sockets.sockets.get(opponent.socketId);
            if (opponentSocket) {
                opponentSocket.join(sessionId);
            }
            // Delete the temp key to prevent others from joining this session
            delete activeQuizzes[tempKey];
            // Emit "opponent-joined" event to both users
            io.to(opponent.socketId).emit("opponent-joined", {
                message: `${userName} has joined the quiz`,
                id: firstUserId,
            });
            io.to(socket.id).emit("opponent-joined", {
                message: `${opponent.userName} has joined the quiz`,
                id: secondUserId,
            });
            // Start the quiz
            io.to(sessionId).emit("start-quiz", { id: sessionId });
        }
        console.log(activeQuizzes, tempKey);
    });
    const handleResults = (sessionId, userName) => {
        const quizSession = activeQuizzes[sessionId];
        if (!quizSession)
            return;
        quizSession.resultsCount += 1;
        if (quizSession.resultsCount === 2) {
            quizSession.resultsCount = 0;
            io.to(sessionId).emit("finish-quiz", { message: `the quiz is done ! lets see who won !` });
        }
        else {
            const otherUser = quizSession.users.find((user) => user.userName !== userName);
            if (otherUser) {
                io.to(otherUser.socketId).emit("done-notification", { message: `${userName} finished the quiz` });
            }
        }
    };
    const handleDone = (sessionId, userName) => {
        const quizSession = activeQuizzes[sessionId];
        console.log(quizSession, activeQuizzes);
        if (!quizSession)
            return;
        quizSession.doneCount += 1;
        if (quizSession.doneCount === 2) {
            quizSession.doneCount = 0;
            quizSession.currentQuestion += 1;
            io.to(sessionId).emit("next-question", quizSession.currentQuestion);
            io.on("next-question", () => {
                io.to(sessionId).emit("reset-timer");
            });
        }
        else {
            const otherUser = quizSession.users.find((user) => user.userName !== userName);
            console.log(otherUser);
            if (otherUser) {
                io.to(otherUser.socketId).emit("done-notification", { message: `${userName} finished the question` });
            }
        }
    };
    const handleEndQuiz = (sessionId, userName) => {
        const quizSession = activeQuizzes[sessionId];
        if (!quizSession)
            return;
        io.to(sessionId).emit("quiz-ended");
        delete activeQuizzes[sessionId];
        console.log(`${userName} ended quiz ${sessionId}`);
    };
    const handleDisconnect = (socket) => {
        for (const sessionId in activeQuizzes) {
            const quiz = activeQuizzes[sessionId];
            quiz.users = quiz.users.filter((user) => user.socketId !== socket.id);
            if (quiz.users.length === 1) {
                // Notify the remaining user that the other has disconnected and end the quiz
                io.to(quiz.users[0].socketId).emit("quiz-ended", { message: `${quiz.users[0].userName} has disconnected` });
                delete activeQuizzes[sessionId];
            }
            else if (quiz.users.length === 0) {
                delete activeQuizzes[sessionId];
            }
        }
        console.log(`Client disconnected: ${socket.id}`);
    };
    return io;
};
exports.default = socketServer;
//# sourceMappingURL=socket.js.map