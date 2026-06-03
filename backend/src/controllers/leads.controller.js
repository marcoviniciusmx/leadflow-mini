import { pool } from '../config/database.js'

export async function getLeads(req, res) {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC')

    res.json(result.rows)
}