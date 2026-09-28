import { pool } from "../database/connection.js"
import { checkWebsite } from "../services/monitoring.service.js";

export async function getWebsites(req, res) {
    try {
        const user_id = req.user.id;
        const result = await pool.query(
            "SELECT * FROM website WHERE user_id = $1",
            [user_id]
        )
        const websiteWithStatus = await Promise.all( result.rows.map(async (website) => {
            const status = await checkWebsite(website.url)
            return {
                ...website,
                status
                }
            })
        )
        if(result.rows) {
            console.log("ok")
        }
        return res.status(200).json(websiteWithStatus);
    } catch(error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
}

export async function addWebsites(req, res){
    try {
        const { name, url } = req.body;
        const logo = req.file ? `/uploads/websites/${req.file.filename}` : null;
        const user_id = req.user.id
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

export async function deleteWebsites(req, res){
    try {
        const user_id = req.user.id
        const idWebsite = req.params.id
        const result = await pool.query(
            "DELETE FROM website WHERE id = $1  AND user_id = $2",
            [idWebsite, user_id]
        )
        if(result.rowCount === 0) {
            return res.status(404).json({ message: "Website not found" })
        }
        if(result.rowCount > 0) {
            res.status(200).json({ message: "Website deleted successfully" })
        }
    } catch(error) {
        console.error("Error deleting website:", error)
        res.status(500).json({ message: "Error deleting website" })
    }
}