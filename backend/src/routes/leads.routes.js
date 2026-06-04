import { Router } from 'express'
import { getLeads, createLead, updateLead } from '../controllers/leads.controller.js'

const router = Router()

router.get('/', getLeads)

router.post('/', createLead)

router.patch('/:id', updateLead)

export default router