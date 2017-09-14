import { connect } from 'react-redux'
import NavBar from './NavBar'
import {auth} from '../../firebase';
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      auth().signOut();
    }
  }
}
const NavBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default NavBarComponent