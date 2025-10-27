const TKEY = 'tm_tickets_v1'

function safeParse(raw) {
  try { return JSON.parse(raw) } catch(e){ return [] }
}

export function getTickets() {
  const raw = localStorage.getItem(TKEY)
  return raw ? safeParse(raw) : []
}

export function saveTickets(list) {
  try {
    localStorage.setItem(TKEY, JSON.stringify(list))
  } catch(e) {
    throw new Error('Failed to save tickets')
  }
}

export function createTicket(data) {
  const list = getTickets()
  const id = Date.now().toString(36)
  const ticket = { id, ...data, createdAt: new Date().toISOString() }
  list.unshift(ticket)
  saveTickets(list)
  return ticket
}

export function updateTicket(id, patch) {
  const list = getTickets()
  const idx = list.findIndex(t => t.id === id)
  if (idx === -1) throw new Error('Ticket not found')
  list[idx] = { ...list[idx], ...patch }
  saveTickets(list)
  return list[idx]
}

export function deleteTicket(id) {
  const list = getTickets().filter(t => t.id !== id)
  saveTickets(list)
}

export function getTicketById(id) {
  return getTickets().find(t => t.id === id) || null
}
