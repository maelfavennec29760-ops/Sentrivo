import { Router } from "express";
import { getWebsites } from "../controllers/websiteController.js";

const routerWebsite = Router();

routerWebsite.get("/", getWebsites);

export { routerWebsite };