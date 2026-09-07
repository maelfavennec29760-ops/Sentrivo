import {pool} from "../database/connection.js"
import * as fs from "node:fs/promises"

export async function postVisitorLog(req, res) {
    try {
        const visitorInfo = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const requestDateTime = new Date().toISOString();
        const visitorLog = `Ip : ${visitorInfo}, Date  : ${requestDateTime}\n `
        await fs.appendFile(
            "../logs/visitors.txt",
            visitorLog,
            console.log(process.cwd())
        )
        res.status(200).json({message: "Visitor logged successfully"
});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Failed to log visitor"});
    }
}