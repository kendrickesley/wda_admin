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
    request_comment_error: false,
    status_form: {
        title: '',
        content: '',
        status: ''
    },
    status_save_loading: false,
    request_status_error: false,
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
        case 'SET_STATUS_TITLE': 
            return {
                ...state,
                status_form: {
                    ...state.status_form,
                    title: action.title
                }
            }
        case 'SET_STATUS_CONTENT': 
            return {
                ...state,
                status_form: {
                    ...state.status_form,
                    content: action.content
                }
            }
        case 'SET_STATUS_STATUS': 
            return {
                ...state,
                status_form: {
                    ...state.status_form,
                    status: action.status
                }
            }
        case 'PUSH_STATUS':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    statuses: [action.status, ...state.ticket.statuses]
                }
            }
        case 'SET_STATUS_SAVE_LOADING':
            return {
                ...state,
                status_save_loading: action.status_save_loading
            }
        case 'REQUEST_STATUS_ERROR':
            return {
                ...state,
                request_status_error: action.request_status_error
            }
        default:
            return state
    }
}