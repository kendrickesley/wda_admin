import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import Login from './Login'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.login
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    googleClicked: () => {
      dispatch(login.setLoading())
    }
  }
}

const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginScreen