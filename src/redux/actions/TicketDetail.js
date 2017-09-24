
//set ticket id to the store
const setTicketID = (ticket_id)=>({
    type: 'SET_TICKETID',
    ticket_id
})

//set ticket object to the store
const setTicket = (ticket) => ({
    type: 'SET_TICKET',
    ticket
})


//set loading flag to the store
const setLoading = (loading)=>({
    type: 'SET_LOADING',
    loading
})


//set success flag to the store
const setSuccess = (success)=>({
    type: 'SET_SUCCESS',
    success
})

//set arrays of available technicians to the store
const setTechnicians = (technicians) => ({
    type: 'SET_TECHNICIANS',
    technicians: technicians
})

//set error flag to the store
const requestError = (error = true) => ({
    type: 'REQUEST_ERROR',
    error
})

//check wyswyg editor state
const setEditorState = (editor_state) => ({
    type: 'SET_EDITOR_STATE',
    editor_state
})

//set comment's content to the store
const setCommentHtml = (comment_html) => ({
    type: 'SET_COMMENT_HTML',
    comment_html
})

//set comment's loading flag to the store
const setCommentSaveLoading = (comment_save_loading) => ({
    type: 'SET_COMMENT_SAVE_LOADING',
    comment_save_loading
})

//push comment to the arrays
const pushComment = (comment) => ({
    type: 'PUSH_COMMENT',
    comment    
})

//set comment's error flag to the store
const requestCommentError = (request_comment_error) => ({
    type: 'REQUEST_COMMENT_ERROR',
    request_comment_error          
})

//set status form [title]
const setStatusTitle = (title) => ({
    type: 'SET_STATUS_TITLE',
    title
})

//set status form [content]
const setStatusContent = (content) => ({
    type: 'SET_STATUS_CONTENT',
    content
})

//set status form [status]
const setStatusStatus = (status) => ({
    type: 'SET_STATUS_STATUS',
    status
})

//set status' loading flag to the store
const setStatusSaveLoading = (status_save_loading) => ({
    type: 'SET_STATUS_SAVE_LOADING',
    status_save_loading
})

//push a status to the array
const pushStatus = (status) => ({
    type: 'PUSH_STATUS',
    status    
})

//set status' error flag to the store
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