var default_state = {
    err_credential: false, //login_error flag
    loading: true, //loading flag,
    error: false
}
export default (state = default_state, action) => {
    switch(action.type){
        case 'WRONG_CREDENTIAL':
            return {
                ...state,
                err_credential: true
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}