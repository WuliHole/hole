import React = require('react')
import { PropTypes } from 'react'
import LoginForm from '../../components/login/login-form'
const connect = require('react-redux').connect
import { loginUser } from '../../actions/session'
import { defualtWallPaper, WallPaper } from '../../components/wallpaper/wallpaper'
import Container from '../../components/container'
import { isRejectedAction } from '../../actions/utils'
import { HistoryBase } from 'react-router'
interface LoginPageProps {
  login
  session
  history: HistoryBase
}

interface LoginPageState {

}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser())
  }
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  static contextTypes = {
    displayError: PropTypes.func
  }

  constructor(props, context) {
    super(props)
  }

  handleSubmit = () => {
    this.props.login()
      .then((res) => {
        if (!isRejectedAction(res)) {
          this.props.history.push(`/dashboard/recent-post`)
        } else {
          (this.context.displayError as DisplayError)(res.payload.errMsg)
        }
      })
  }

  render() {
    return <div className="LoginPage" >
      <WallPaper className="bg-white">
        <Container size={ 4 } center
          style={ {
            backgroundColor: 'rgba(0,0,0,0)',
            paddingTop: '16rem',
            padding: '15%'
          } }>
          <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)' } }>
            <LoginForm onSubmit={ this.handleSubmit }
              hasError={ this.props.session.get('hasError') }
              isPending={ this.props.session.get('isLoading') }
            />
          </Container >
        </Container >
      </WallPaper>
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)