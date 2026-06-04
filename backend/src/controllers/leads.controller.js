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

export async function updateLead(req, res) {
    const { id } = req.params

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

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: 'Envie pelo menos um campo para atualizar.'
        })
    }

    const result = await pool.query(
        `
      UPDATE leads
      SET
        business_name = COALESCE($1, business_name),
        contact_name = COALESCE($2, contact_name),
        phone = COALESCE($3, phone),
        segment = COALESCE($4, segment),
        status = COALESCE($5, status),
        proposal_value = COALESCE($6::numeric, proposal_value),
        next_follow_up_date = COALESCE($7::date, next_follow_up_date),
        notes = COALESCE($8, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
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
            notes,
            id
        ]
    )

    if (result.rows.length === 0) {
        return res.status(404).json({
            message: 'Lead não encontrado.'
        })
    }

    return res.json(result.rows[0])
}