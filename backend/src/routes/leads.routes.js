import { Router } from 'express'
import { getLeads } from '../controllers/leads.controller.js'

const router = Router()

router.get('/', getLeads)

export default router