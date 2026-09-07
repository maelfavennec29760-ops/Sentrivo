import { checkDatabaseConnection } from "./database/connection.js";
import express from "express";
import {router} from "./routes/authRoutes.js"
import {routerWebsite} from "./routes/websiteRoutes.js"
import {routerVisitorLog} from "./routes/visitorLogRoute.js"

await checkDatabaseConnection();


const app = express();
app.use(express.json());

app.use('/api/auth', router);
app.use('/api/websites', routerWebsite)
app.use('/api/visitorLog', routerVisitorLog)

app.listen(3000, () => {
    console.log("🚀 Server listening on port 3000")
});


