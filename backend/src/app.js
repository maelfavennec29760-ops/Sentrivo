import { checkDatabaseConnection } from "./database/connection.js";
import express from "express";
import {router} from "./routes/authRoutes.js"
import {routerWebsite} from "./routes/websiteRoutes.js"
import {routerVisitorLog} from "./routes/visitorLogRoute.js"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await checkDatabaseConnection();


const app = express();
app.use(express.json());
app.use('/uploads',
        express.static(path.join(__dirname, "../uploads"))
);

app.use('/api/auth', router);
app.use('/api/websites', routerWebsite);
app.use('/api/visitorLog', routerVisitorLog);

app.listen(3000, () => {
    console.log("🚀 Server listening on port 3000")
});


