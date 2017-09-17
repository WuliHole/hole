import React = require('react')
import { PropTypes } from 'react'
import SignUpForm from '../../components/login/reg-form'
const connect = require('react-redux').connect
import { signUpUser } from '../../actions/session'
import { defualtWallPaper, WallPaper } from '../../components/wallpaper/wallpaper'
import Container from '../../components/container'
import { isRejectedAction } from '../../actions/utils'
import { HistoryBase } from 'react-router'
interface SignUpPageProps {
  signup
  session
  history: HistoryBase
}

interface SignUpPageState {

}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: () => dispatch(signUpUser())
  }
}

class SignUpPage extends React.Component<SignUpPageProps, SignUpPageState> {
  static contextTypes = {
    displayMessage: PropTypes.func,
    displayError: PropTypes.func
  }
  constructor(props) {
    super(props)
  }

  handleSubmit = () => {
    this.props.signup()
      .then((res) => {
        if (!isRejectedAction(res)) {
          (this.context.displayMessage as DisplayMessage)('激活邮件已经发送')
          this.props.history.push('/')
        } else {
          (this.context.displayError as DisplayError)(res.payload.errMsg)
        }
      })
  }

  render() {
    return <div className="SignUpPage" >
      <WallPaper className="bg-white">
        <Container size={ 4 } center
          style={ {
            backgroundColor: 'rgba(0,0,0,0)',
            paddingTop: '16rem',
            padding: '15%'
          } }>
          <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)' } }>
            <SignUpForm onSubmit={ this.handleSubmit }
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
)(SignUpPage)