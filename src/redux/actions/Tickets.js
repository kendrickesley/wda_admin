//set array of tickets to the store
const setTickets = (tickets)=>({
    type: 'SET_TICKETS',
    tickets: tickets
})

//push a ticket to the store
const pushTicket = (ticket) => ({
    type: 'PUSH_TICKET',
    ticket: ticket
})

//delete all tickets in the store
const clearTickets = () => ({
    type: 'CLEAR_TICKETS'
})

//set loading flag to the store
const setLoading = (loading)=>({
    type: 'SET_LOADING',
    loading:loading
})

//set success flag to the store
const setSuccess = (success)=>({
    type: 'SET_SUCCESS',
    success: success
})

//set all available technicians to the store
const setTechnicians = (technicians) => ({
    type: 'SET_TECHNICIANS',
    technicians: technicians
})


//change the technician of a ticket
const changeTecnhician = (technician, index) => ({
    type: 'CHANGE_TECHNICIAN',
    technician,
    index
})


//change priority of a ticket
const changePriority = (priority, index) => ({
    type: 'CHANGE_PRIORITY',
    priority,
    index
})

//change escalation level of a ticket
const changeEscalationLevel = (escalation_level, index) => ({
    type: 'CHANGE_ESCALATION_LEVEL',
    escalation_level,
    index
})

//set save loading flag of a ticket
const setSaveLoading = (loading, index) => ({
    type: 'SET_SAVE_LOADING',
    loading,
    index
})

//set static flag of a ticket
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