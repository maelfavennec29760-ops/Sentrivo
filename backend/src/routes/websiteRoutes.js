import { Router } from "express";
import { getWebsites, addWebsites } from "../controllers/websiteController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js"

const routerWebsite = Router();

routerWebsite.get("/", getWebsites);
routerWebsite.post("/",authenticateToken, upload.single("logo"), addWebsites)

export { routerWebsite };