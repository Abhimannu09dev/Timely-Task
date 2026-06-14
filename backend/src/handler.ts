import serverless = require("serverless-http");
import { app } from "./app";

export = serverless(app);
