import { CronJob } from "cron";
import { FRONTEND_URL } from "../config/config.js";
import http from "node:http";
import https from "node:https";

// Every 14 minutes send a GET request to the health endpoint
let job = new CronJob("*/14 * * * *", function () {
  const base = FRONTEND_URL;
  if (!base) return;

  const url = new URL("/health", base).href;
  const client = url.startsWith("https:") ? https : http;

  client
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("Request sent sucessfully.");
      else console.log("Request failed: ", res.statusCode);
    })
    .on("error", (e) => console.log("Error while sending the request: ", e));
});

export default job;
