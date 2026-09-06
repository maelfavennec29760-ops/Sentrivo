import {pool} from "../database/connection.js"

export async function getWebsites(req, res) {
    try {
        const user_id = 1
        const result = await pool.query(
            "SELECT * FROM website WHERE user_id = $1",
            [user_id]
        )
        if(result.rows) {
            console.log("ok")
        }
        return res.status(200).json(result.rows);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}