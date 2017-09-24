//react-redux components
import { connect } from 'react-redux'

//custom Components
import TicketList from './TicketList'
import {tickets} from '../../redux/actions'

//All variables which will be passed to props
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.tickets,
    ...state.auth
  }
}

//All methods which will be passed to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadRequest: () => {
      dispatch(tickets.setLoading(true))
    },
    populateTickets: (array) => {
      console.log(array);
      dispatch(tickets.setTickets(array.map(item=>(
        {...item, 
          static: item.technical_email !== null, 
          save_loading: false}
      ))))
      dispatch(tickets.setSuccess(true))
      dispatch(tickets.setLoading(false))
    },
    requestError: () => {
      dispatch(tickets.setLoading(false))
      dispatch(tickets.setSuccess(false))
    },
    populateTechnicians: (array) => {
      dispatch(tickets.setTechnicians(array))
    },
    changeTechnician: (newVal, index) => {
      dispatch(tickets.changeTecnhician(newVal, index));
    },
    changePriority: (newVal, index) => {
      dispatch(tickets.changePriority(newVal, index));
    },
    changeEscalationLevel: (newVal, index) => {
      dispatch(tickets.changeEscalationLevel(newVal, index));
    },
    setSaveLoading: (loading = true, index) => {
      dispatch(tickets.setSaveLoading(loading, index));
    },
    setStatic: (newVal = true, index) => {
      dispatch(tickets.setStatic(newVal, index))
    }
  }
}

//Create TicketList which is connected with redux
const TicketListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketList)

export default TicketListScreen