const API_URL = 'http://localhost:3002/leads'

export async function getLeads() {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Erro ao buscar leads')
    }

    const data = await response.json()
    return data
}

export async function createLead(leadData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar lead')
    }

    return data
}