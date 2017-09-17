import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import Login from './Login'
import {auth, google_provider, fb_provider} from '../../firebase';
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.login
  }
}

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

const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginScreen