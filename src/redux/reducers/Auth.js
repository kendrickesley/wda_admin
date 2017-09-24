var default_state = {
    user: null, //authenticated user object
    position: null //authenticated user's position
}
export default (state = default_state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_POSITION':
            return {
                ...state,
                position: action.position
            }
        case 'LOGOUT': 
            return {
                ...state,
                position: null,
                user: null
            }
        default:
            return state
    }
}