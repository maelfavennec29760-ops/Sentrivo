import { checkDatabaseConnection } from "./database/connection.js";
import express from "express";
import {router} from "./routes/authRoutes.js"

await checkDatabaseConnection();


const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("🚀 Server listening on port 3000")
});

app.use('/api/auth', router);
