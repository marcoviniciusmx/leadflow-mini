import { pool } from '../config/database.js'

export async function getLeads(req, res) {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC')

    res.json(result.rows)
}

export async function createLead(req, res) {
    const {
        business_name,
        contact_name,
        phone,
        segment,
        status,
        proposal_value,
        next_follow_up_date,
        notes
    } = req.body

    if (!business_name) {
        return res.status(400).json({
            message: 'O nome do negócio é obrigatório'
        })
    }

    const result = await pool.query(
        `
        INSERT INTO leads (
            business_name,
            contact_name,
            phone,
            segment,
            status,
            proposal_value,
            next_follow_up_date,
            notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `,
        [
            business_name,
            contact_name,
            phone,
            segment,
            status,
            proposal_value,
            next_follow_up_date,
            notes
        ]
    )

    return res.status(201).json(result.rows[0])
}