//react-router & react-redux components
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'

//WSYWYG Editor Components
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

//Custom components
import TicketDetail from './TicketDetail'
import {ticketDetail} from '../../redux/actions'



//All variables which will be passed to props
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.ticketDetail,
    ...state.auth
  }
}

//All methods which will be passed to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadRequest: () => {
      dispatch(ticketDetail.setLoading(true))
    },
    setTicketID: (tid) => {
      dispatch(ticketDetail.setTicketID(tid));
    },
    populateTechnicians: (array) => {
      dispatch(ticketDetail.setTechnicians(array))
    },
    setTicket: (ticket) => { 
      dispatch(ticketDetail.setTicket(ticket))
    },
    requestError: (error = true) => {
      dispatch(ticketDetail.requestError(error));
      dispatch(ticketDetail.setLoading(false))
    },
    setEditorState: (editor_state) => {
      dispatch(ticketDetail.setEditorState(editor_state))
      dispatch(ticketDetail.setCommentHtml(draftToHtml(convertToRaw(editor_state.getCurrentContent()))))
    },
    goBack: () => {
      dispatch(goBack())
    },
    setCommentSaveLoading: (comment_save_loading = true) => {
      dispatch(ticketDetail.setCommentSaveLoading(comment_save_loading));
    },
    pushComment: (comment) => {
      dispatch(ticketDetail.pushComment(comment))
    },
    requestCommentError: (request_comment_error = true) => {
      dispatch(ticketDetail.requestCommentError(request_comment_error));
    },
    setStatusTitle: (title) => {
      dispatch(ticketDetail.setStatusTitle(title))
    },
    setStatusContent: (content) => {
      dispatch(ticketDetail.setStatusContent(content))
    },
    setStatusStatus: (status) => {
      dispatch(ticketDetail.setStatusStatus(status))
    },
    setStatusSaveLoading: (status_save_loading = true) => {
      dispatch(ticketDetail.setStatusSaveLoading(status_save_loading));
    },
    pushStatus: (status) => {
      dispatch(ticketDetail.pushStatus(status))
    },
    requestStatusError: (request_status_error = true) => {
      dispatch(ticketDetail.requestStatusError(request_status_error));
    },
  }
}

//Create TicketDetail which is connected with redux
const TicketDetailScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDetail)

export default TicketDetailScreen