const setTickets = (tickets)=>({
    type: 'SET_TICKETS',
    tickets: tickets
})

const pushTicket = (ticket) => ({
    type: 'PUSH_TICKET',
    ticket: ticket
})

const clearTickets = () => ({
    type: 'CLEAR_TICKETS'
})

const setLoading = (loading)=>({
    type: 'SET_LOADING',
    loading:loading
})

const setSuccess = (success)=>({
    type: 'SET_SUCCESS',
    success: success
})

const setTechnicians = (technicians) => ({
    type: 'SET_TECHNICIANS',
    technicians: technicians
})

export default {
    setTickets,
    pushTicket,
    clearTickets,
    setLoading,
    setSuccess,
    setTechnicians
}