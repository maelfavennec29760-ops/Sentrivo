import { Router } from "express";
import { postVisitorLog } from "../controllers/visitorLogController.js"

const routerVisitorLog = Router();

routerVisitorLog.post("/", postVisitorLog);

export { routerVisitorLog }