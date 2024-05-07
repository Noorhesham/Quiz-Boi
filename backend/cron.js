"use strict";
const cron = require("cron");
const https = require("https");
const url = "https://quiz-boi.onrender.com/api/v1/quiz?page=1&limit=1";
module.exports = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(url, (res) => {
        if (res.statusCode === 200)
            console.log("server good");
        else
            console.error("failed");
    })
        .on("error", (err) => console.log(err));
});
