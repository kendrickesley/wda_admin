import { EditorState } from 'draft-js';
var default_state = {
    ticket: null,
    success: false,
    loading: false,
    technicians: [],
    ticket_id: null,
    request_error: false,
    editor_state: EditorState.createEmpty(),
    comment_html: '',
    comment_save_loading: false,
    request_comment_error: false
}
export default (state = default_state, action) => {
    switch(action.type){
        case 'SET_TICKETID':
            return {
                ...state,
                ticket_id: action.ticket_id
            }
        case 'SET_TICKET':
            return {
                ...state,
                ticket: action.ticket
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
        case 'REQUEST_ERROR':
            return {
                ...state,
                request_error: action.error
            }
        case 'SET_EDITOR_STATE':
            return {
                ...state,
                editor_state: action.editor_state
            }
        case 'SET_COMMENT_HTML':
            return {
                ...state,
                comment_html: action.comment_html
            }
        case 'PUSH_COMMENT':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    comments: [action.comment, ...state.ticket.comments]
                }
            }
        case 'SET_COMMENT_SAVE_LOADING':
            return {
                ...state,
                comment_save_loading: action.comment_save_loading
            }
        case 'REQUEST_COMMENT_ERROR':
            return {
                ...state,
                request_comment_error: action.request_comment_error
            }
        default:
            return state
    }
}