var default_state = {
    tickets: [],
    success: false,
    loading: false,
    technicians: []
}
export default (state = default_state, action) => {
    switch(action.type){
        case 'SET_TICKETS':
            return {
                ...state,
                tickets: action.tickets
            }
        case 'PUSH_TICKET':
            return {
                ...state,
                tickets: [...state.tickets, action.ticket]
            }
        case 'CLEAR_TICKETS':
            return {
                ...state,
                tickets: []
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        case 'SET_SUCCESS':
            return {
                ...state,
                success: action.success
            }
        case 'SET_TECHNICIANS':
            return {
                ...state,
                technicians: action.technicians
            }
        case 'CHANGE_TECHNICIAN':
            let tempTickets = state.tickets.map((item, index)=>{
                if(index !== action.index){
                    return item
                }

                return {
                    ...item,
                    technician_email: action.technician
                }
            })
            return {
                ...state,
                tickets: [...tempTickets]
            }
        default:
            return state
    }
}