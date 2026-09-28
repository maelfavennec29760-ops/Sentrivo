import { Router } from "express";
import { getWebsites, addWebsites, deleteWebsites } from "../controllers/websiteController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js"

const routerWebsite = Router();

routerWebsite.get("/",authenticateToken, getWebsites);
routerWebsite.post("/",authenticateToken, upload.single("logo"), addWebsites)
routerWebsite.delete("/:id", authenticateToken, deleteWebsites)

export { routerWebsite };