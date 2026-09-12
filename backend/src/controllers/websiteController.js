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

export async function addWebsites(req, res){
    try {
        const { name, url } = req.body;
        const logo = req.file ? `/uploads/websites/${req.file.filename}` : null;
        const user_id = 1;
        const result = await pool.query(
            `INSERT INTO website (user_id, name, url, logo)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, name, url, logo]
        );
        res.status(201).json(result.rows[0]);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Error creating website" })
    }
}
