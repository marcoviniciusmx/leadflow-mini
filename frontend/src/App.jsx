import { useEffect, useState } from 'react'
import { createLead, getLeads, deleteLead, updateLead } from './services/leadService'

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    segment: '',
    status: 'Novo',
    proposal_value: '',
    next_follow_up_date: '',
    notes: ''
  })

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

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.business_name.trim()) {
      setError('O nome do negócio é obrigatório.')
      return
    }

    const leadData = {
      business_name: formData.business_name,
      contact_name: formData.contact_name || null,
      phone: formData.phone || null,
      segment: formData.segment || null,
      status: formData.status || 'Novo',
      proposal_value: Number(formData.proposal_value) || 0,
      next_follow_up_date: formData.next_follow_up_date || null,
      notes: formData.notes || null
    }

    try {
      const newLead = await createLead(leadData)

      setLeads((currentLeads) => [newLead, ...currentLeads])

      setFormData({
        business_name: '',
        contact_name: '',
        phone: '',
        segment: '',
        status: 'Novo',
        proposal_value: '',
        next_follow_up_date: '',
        notes: ''
      })

      setError('')
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleDeleteLead(id) {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este lead?')

    if (!confirmDelete) {
      return
    }

    try {
      await deleteLead(id)

      setLeads((currentLeads) =>
        currentLeads.filter((lead) => lead.id !== id)
      )

      setError('')
    } catch (error) {
      setError(error.message)
    }
  }

  async function handleUpdateStatus(id, newStatus) {
    try {
      const updatedLead = await updateLead(id, {
        status: newStatus
      })

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === id ? updatedLead : lead
        )
      )

      setError('')
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) {
    return <p>Carregando leads...</p>
  }

  return (
    <main>
      <h1>LeadFlow Mini</h1>

      <form onSubmit={handleSubmit}>
        <h2>Cadastrar novo lead</h2>

        <div>
          <label>Nome do negócio</label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            placeholder="Ex: Pizzaria Principal"
          />
        </div>

        <div>
          <label>Nome do contato</label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            placeholder="Ex: Carlos"
          />
        </div>

        <div>
          <label>Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ex: 61999999999"
          />
        </div>

        <div>
          <label>Segmento</label>
          <input
            type="text"
            name="segment"
            value={formData.segment}
            onChange={handleChange}
            placeholder="Ex: Pizzaria"
          />
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Novo">Novo</option>
            <option value="Contatado">Contatado</option>
            <option value="Respondeu">Respondeu</option>
            <option value="Proposta enviada">Proposta enviada</option>
            <option value="Negociação">Negociação</option>
            <option value="Fechado">Fechado</option>
            <option value="Perdido">Perdido</option>
          </select>
        </div>

        <div>
          <label>Valor da proposta</label>
          <input
            type="number"
            name="proposal_value"
            value={formData.proposal_value}
            onChange={handleChange}
            placeholder="Ex: 900"
          />
        </div>

        <div>
          <label>Próximo follow-up</label>
          <input
            type="date"
            name="next_follow_up_date"
            value={formData.next_follow_up_date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Observações</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ex: Cliente pediu retorno na próxima semana."
          />
        </div>

        <button type="submit">Cadastrar lead</button>
      </form>

      {error && <p>{error}</p>}

      <section>
        <h2>Leads cadastrados</h2>
        <p>Total de leads: {leads.length}</p>

        {leads.map((lead) => (
          <div key={lead.id}>
            <h3>{lead.business_name}</h3>
            <p>Contato: {lead.contact_name}</p>
            <p>Telefone: {lead.phone}</p>
            <p>Segmento: {lead.segment}</p>
            <div>
              <label>Status: </label>
              <select
                value={lead.status}
                onChange={(event) => handleUpdateStatus(lead.id, event.target.value)}
              >
                <option value="Novo">Novo</option>
                <option value="Contatado">Contatado</option>
                <option value="Respondeu">Respondeu</option>
                <option value="Proposta enviada">Proposta enviada</option>
                <option value="Negociação">Negociação</option>
                <option value="Fechado">Fechado</option>
                <option value="Perdido">Perdido</option>
              </select>
            </div>
            <p>Valor da proposta: R$ {lead.proposal_value}</p>
            <p>Observações: {lead.notes}</p>
            <button type="button" onClick={() => handleDeleteLead(lead.id)}>
              Excluir lead
            </button>
            <hr />
          </div>
        ))}
      </section>
    </main>
  )
}

export default App