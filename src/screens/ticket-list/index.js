import { connect } from 'react-redux'
import TicketList from './TicketList'
import {tickets} from '../../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.tickets
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadRequest: () => {
      dispatch(tickets.setLoading(true))
    },
    populateTickets: (array) => {
      dispatch(tickets.setTickets(array))
      dispatch(tickets.setSuccess(true))
      dispatch(tickets.setLoading(false))
    },
    requestError: () => {
      dispatch(tickets.setLoading(false))
      dispatch(tickets.setSuccess(false))
    },
    populateTechnicians: (array) => {
      dispatch(tickets.setTechnicians(array))
    }
  }
}

const TicketListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketList)

export default TicketListScreen