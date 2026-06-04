const API_URL = 'http://localhost:3002/leads'

export async function getLeads() {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Erro ao buscar leads')
    }

    const data = await response.json()
    return data
}