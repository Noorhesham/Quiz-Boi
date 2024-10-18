const dotenv = require("dotenv");
const Mongoose = require("mongoose");
const app = require("./app");
const http = require("http");
import socketServer from "./socket";
const job = require("./cron");
job.start();
dotenv.config({ path: "./config.env" });
Mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected succesfully !"));
const httpServer = http.createServer(app);
const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS COONECTED TO PORT ${process.env.PORT}`);
});
const io = socketServer(server);
