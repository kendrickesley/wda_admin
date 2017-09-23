const setTicketID = (ticket_id)=>({
    type: 'SET_TICKETID',
    ticket_id
})

const setTicket = (ticket) => ({
    type: 'SET_TICKET',
    ticket
})

const setLoading = (loading)=>({
    type: 'SET_LOADING',
    loading
})

const setSuccess = (success)=>({
    type: 'SET_SUCCESS',
    success
})

const setTechnicians = (technicians) => ({
    type: 'SET_TECHNICIANS',
    technicians: technicians
})

const requestError = (error = true) => ({
    type: 'REQUEST_ERROR',
    error
})

const setEditorState = (editor_state) => ({
    type: 'SET_EDITOR_STATE',
    editor_state
})

const setCommentHtml = (comment_html) => ({
    type: 'SET_COMMENT_HTML',
    comment_html
})

const setCommentSaveLoading = (comment_save_loading) => ({
    type: 'SET_COMMENT_SAVE_LOADING',
    comment_save_loading
})
const pushComment = (comment) => ({
    type: 'PUSH_COMMENT',
    comment    
})
const requestCommentError = (request_comment_error) => ({
    type: 'REQUEST_COMMENT_ERROR',
    request_comment_error          
})

const setStatusTitle = (title) => ({
    type: 'SET_STATUS_TITLE',
    title
})

const setStatusContent = (content) => ({
    type: 'SET_STATUS_CONTENT',
    content
})

const setStatusStatus = (status) => ({
    type: 'SET_STATUS_STATUS',
    status
})

const setStatusSaveLoading = (status_save_loading) => ({
    type: 'SET_STATUS_SAVE_LOADING',
    status_save_loading
})
const pushStatus = (status) => ({
    type: 'PUSH_STATUS',
    status    
})
const requestStatusError = (request_status_error) => ({
    type: 'REQUEST_STATUS_ERROR',
    request_status_error          
})

export default {
    setTicketID,
    setTicket,
    setLoading,
    setSuccess,
    setTechnicians,
    requestError,
    setEditorState,
    setCommentHtml,
    setCommentSaveLoading,
    pushComment,
    requestCommentError,
    setStatusTitle,
    setStatusContent,
    setStatusStatus,
    setStatusSaveLoading,
    pushStatus,
    requestStatusError
}