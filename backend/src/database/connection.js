import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

export async function checkDatabaseConnection(){
    let connectPool = null;
    try {
        connectPool = await pool.connect()
        console.log("✅ Connected to PostgreSQL");
    } catch(error) {
        console.error("❌ Failed to connect to PostgreSQL:", error)
    } finally {
        if(connectPool) {
            connectPool.release();
        }
    }
}