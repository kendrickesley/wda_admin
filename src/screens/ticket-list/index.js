import { connect } from 'react-redux'
import TicketList from './TicketList'

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    
  }
}

const TicketListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketList)

export default TicketListScreen