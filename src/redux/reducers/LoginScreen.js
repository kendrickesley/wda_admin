var default_state = {
    err_credential: false,
    loading: false
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
                loading: !state.loading
            }
        default:
            return state
    }
}