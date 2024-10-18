"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const Mongoose = require("mongoose");
const app = require("./app");
const http = require("http");
const socket_1 = __importDefault(require("./socket"));
const job = require("./cron");
job.start();
dotenv.config({ path: "./config.env" });
Mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected succesfully !"));
const httpServer = http.createServer(app);
const server = app.listen(process.env.PORT, () => {
    console.log(`SERVER IS COONECTED TO PORT ${process.env.PORT}`);
});
const io = (0, socket_1.default)(server);
//# sourceMappingURL=server.js.map