import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.port || 3002

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Olá, rota acessada com sucesso')
})

app.get('/health', (req, res) => {
    res.send({ "status": "ok", "message": "API LeadFlow Mini funcionando" })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})