import { Router } from 'express'
import { getLeads, createLead, updateLead, deleteLead } from '../controllers/leads.controller.js'

const router = Router()

router.get('/', getLeads)
router.post('/', createLead)
router.patch('/:id', updateLead)
router.delete('/:id', deleteLead)

export default router