import {pool} from "../database/connection.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

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

export async function login(req, res) {
    try {
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Email and password are required"})
        } 
        const result = await pool.query(
            "SELECT id, password_hash FROM users WHERE email = $1",
            [email]
        )
            if(result.rowCount === 0) {
                return res.status(401).json({message: "Invalid email or password."})
            }
        const passwordHash = result.rows[0].password_hash;
        const isValidePassword = await bcrypt.compare(password, passwordHash)
        if(!isValidePassword) {
            return res.status(401).json({message: "Invalid email or password."})
        } 
        const token = jsonwebtoken.sign({id : result.rows[0].id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        return res.status(200).json({
             token
          });
       
        } catch(error) {
        console.error("❌ Failed to login", error);
        return res.status(500).json({
            message: "Internal server error"
        }) 
    }
}
