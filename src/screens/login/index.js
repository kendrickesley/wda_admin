//react-router & react-redux components
import { connect } from 'react-redux'

//custom components
import { login } from '../../redux/actions'
import Login from './Login'

//firebase components
import {auth, google_provider, fb_provider} from '../../firebase';

//All variables which will be passed to props
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.login
  }
}

//All methods which will be passed to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    googleClicked: () => {
      dispatch(login.setLoading(true))
      const result = auth().signInWithRedirect(google_provider)
    },
    facebookClicked: () => {
      dispatch(login.setLoading(true))
      const result = auth().signInWithRedirect(fb_provider)
    }
  }
}

//Create Login which is connected with redux
const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginScreen