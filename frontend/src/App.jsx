import { useEffect, useState } from 'react'
import { getLeads } from './services/leadService.js'

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadLeads() {
    try {
      const data = await getLeads()
      setLeads(data)
    } catch (error) {
      setError('Não foi possível carregar os leads.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  if (loading) {
    return <p>Carregando leads...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <main>
      <h1>LeadFlow Mini</h1>
      <p>Total de leads: {leads.length}</p>

      {leads.map((lead) => (
        <div key={lead.id}>
          <h2>{lead.business_name}</h2>
          <p>Contato: {lead.contact_name}</p>
          <p>Telefone: {lead.phone}</p>
          <p>Segmento: {lead.segment}</p>
          <p>Status: {lead.status}</p>
          <p>Valor da proposta: R$ {lead.proposal_value}</p>
          <hr />
        </div>
      ))}
    </main>
  )
}

export default App