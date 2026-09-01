import {pool} from "../database/connection.js"
import bcrypt from "bcrypt"

export async function register(req, res) {
    try {
    const {username, email,password} = req.body;
    if(!username || !email || !password) {
        
        return res.status(400).json({message: "Username, email and password are required."})
    }
    const result = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    )
        if(result.rowCount > 0) {
            return res.status(409).json({message: "Email already used"})
        }
    const passwordHash = await bcrypt.hash(password, 10)

    await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
        [
            username,
            email,
            passwordHash
        ]
    )
     return res.status(201).json({
        message: "User created successfully"
    })
    } catch(error) {
        console.error("❌ Failed to register", error);
        return res.status(500).json({
            message: "Internal server error"
        }) 
    }
}

