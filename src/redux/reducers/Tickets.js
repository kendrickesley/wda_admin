var default_state = {
    tickets: [], //all available tickets
    success: false, //success flag
    loading: false, //loading flag
    technicians: [], //all available technicians
    static: false //static flag
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
            return {
                ...state,
                tickets: state.tickets.map((item, index)=>{
                    if(index !== action.index){
                        return item
                    }
    
                    return {
                        ...item,
                        technical_email: action.technician
                    }
                })
            }
        case 'CHANGE_PRIORITY':
            return {
                ...state,
                tickets: state.tickets.map((item, index)=>{
                    if(index !== action.index){
                        return item
                    }
    
                    return {
                        ...item,
                        priority: action.priority
                    }
                })
            }
        case 'CHANGE_ESCALATION_LEVEL':
            return {
                ...state,
                tickets: state.tickets.map((item, index)=>{
                    if(index !== action.index){
                        return item
                    }
    
                    return {
                        ...item,
                        escalation_level: action.escalation_level
                    }
                })
            }
        case 'SET_SAVE_LOADING':
            return {
                ...state,
                tickets: state.tickets.map((item, index)=>{
                    if(index !== action.index){
                        return item
                    }
    
                    return {
                        ...item,
                        save_loading: action.loading
                    }
                })
            }
        case 'SET_STATIC':
            return {
                ...state,
                tickets: state.tickets.map((item, index)=>{
                    if(index !== action.index){
                        return item
                    }
    
                    return {
                        ...item,
                        static: action.static
                    }
                })
            }
        default:
            return state
    }
}