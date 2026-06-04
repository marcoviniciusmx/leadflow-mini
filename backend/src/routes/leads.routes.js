import { Router } from 'express'
import { getLeads, createLead } from '../controllers/leads.controller.js'

const router = Router()

router.get('/', getLeads)

router.post('/', createLead)

export default router