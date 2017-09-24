//react-redux components
import { connect } from 'react-redux'

//custom components
import NavBar from './NavBar'

//firebase components
import {auth} from '../../firebase';

//All variables which will be passed to props
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.auth
  }
}

//All methods which will be passed to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      auth().signOut();
    }
  }
}

//Create NavBar which is connected with redux
const NavBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default NavBarComponent