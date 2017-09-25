import { EditorState } from 'draft-js';
var default_state = {
    ticket: null, //ticket object
    success: false, //success flag
    loading: false, //loading flag
    technicians: [], //technicians for assigning
    ticket_id: null, //ticket_id
    request_error: false, //error flag
    editor_state: EditorState.createEmpty(), //wyswyg editor
    comment_html: '', //wyswyg content in html
    comment_save_loading: false, //comment loading flag
    request_comment_error: false, //comment error floag
    status_form: {
        title: '', //status [title]
        content: '', //status [content]
        status: '' //status [status]
    },
    status_save_loading: false, //status loading flag
    request_status_error: false, //status error flag,
    technician_form: {
        technical_email: '', //technician's email
        escalation_level: '' //escalation level of the ticket
    },
    technician_save_loading: false, //technician loading flag
    request_technician_error: false //technician error flag
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
        case 'SET_TECHNICIAN_SAVE_LOADING':
            return {
                ...state,
                technician_save_loading: action.technician_save_loading
            }
        case 'SET_TECHNICIAN_EMAIL':
            return {
                ...state,
                technician_form: {
                    ...state.technician_form,
                    technical_email: action.technical_email
                }
            }
        case 'SET_TECHNICIAN_ESCALATION_LEVEL':
            return {
                ...state,
                technician_form: {
                    ...state.technician_form,
                    escalation_level: action.escalation_level
                }
            }
        case 'PUSH_TECHNICIAN_HISTORY':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    admins: [action.history, ...state.ticket.admins]
                }
            }
        case 'REQUEST_TECHNICIAN_ERROR':
            return {
                ...state,
                request_technician_error: action.request_technician_error
            }
        case 'SET_TICKET_TECHNICIAN':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    technical_email: action.technical_email
                }
            }
        case 'SET_TICKET_ESCALATION_LEVEL':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    escalation_level: action.escalation_level
                }
            }
        default:
            return state
    }
}