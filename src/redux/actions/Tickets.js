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

const changeTecnhician = (technician, index) => ({
    type: 'CHANGE_TECHNICIAN',
    technician,
    index
})

const changePriority = (priority, index) => ({
    type: 'CHANGE_PRIORITY',
    priority,
    index
})

const changeEscalationLevel = (escalation_level, index) => ({
    type: 'CHANGE_ESCALATION_LEVEL',
    escalation_level,
    index
})

const setSaveLoading = (loading, index) => ({
    type: 'SET_SAVE_LOADING',
    loading,
    index
})

const setStatic = (newVal, index) => ({
    type: 'SET_STATIC',
    static: newVal,
    index
})

export default {
    setTickets,
    pushTicket,
    clearTickets,
    setLoading,
    setSuccess,
    setTechnicians,
    changeTecnhician,
    changePriority,
    changeEscalationLevel,
    setSaveLoading,
    setStatic
}