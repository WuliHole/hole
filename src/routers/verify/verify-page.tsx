import * as React from 'react'
import * as classnames from 'classnames'
import Button from '../../components/button'
import Alert from '../../components/alert'
import Container from '../../components/container'
// import { updateArticleList } from '../actions/article';
import Board from '../../components/board'
import { setPassword, updateUserInfo } from '../../actions/session'
import { LOGIN_USER_SUCCESS } from 'app/constants/index'
import ResetPassWord from './setPassword.form'
import Personalization from './personalizaion.form'
import { Link, HistoryBase } from 'react-router'
import Transition from '../../components/transition'
import { RaisedButton } from 'material-ui'
import { PropTypes } from 'react'
import { isRejectedAction } from 'app/actions/utils'
const connect = require('react-redux').connect

interface IVerifyPageProps extends React.Props<any> {
  session: any;
  setPassword: () => any
  updateProfile: () => any
  history: HistoryBase
  location
  dispatch
}

function mapStateToProps(state) {
  return {
    article: state.article,
    router: state.router,
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPassword: () => dispatch(setPassword()),
    updateProfile: () => dispatch(updateUserInfo('personalization')),
    dispatch
  }
}


enum VERIFY_STEP {
  ABORD,
  SET_PASSWORD,
  UPDATE_USER_INFO,
  DONE
}

interface VerifyPageState {
  step: number
}

class VerifyPage extends React.Component<IVerifyPageProps, VerifyPageState> {
  static getContextTypes = {
    displayError: PropTypes.func
  }

  state: VerifyPageState = { step: VERIFY_STEP.SET_PASSWORD }

  step = (step: number) => this.setState({ step })

  componentWillMount() {
    const errMsg = this.getErrorMessage()
    if (errMsg) {
      this.step(VERIFY_STEP.ABORD)
    }

    const token = this.getAuthToken()
    const payload = this.getPayload()
    this.props.dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        token,
        ...payload
      }
    })
  }

  setPassword = () => {
    this.props
      .setPassword()
      .then((res) => {
        if (!isRejectedAction(res)) {
          this.step(VERIFY_STEP.UPDATE_USER_INFO)
        } else {
          this.context.displayError(res.payload.errMsg)
        }
      })
  }

  updateProfile = () => {
    this.props
      .updateProfile()
      .then((res) => {
        if (!isRejectedAction(res)) {
          this.step(VERIFY_STEP.DONE)
        } else {
          this.context.displayError(res.payload.errMsg)
        }
      })
  }

  getErrorMessage(): string {
    const element = document.querySelector('meta[name="error-msg"]')
    if (element) {
      return element.getAttribute('content')
    }
  }

  getAuthToken(): string {
    const element = document.querySelector('meta[name="auth-token"]')
    if (element) {
      return element.getAttribute('content')
    }
  }

  getPayload() {
    const element = document.querySelector('meta[name="payload"]')
    if (element) {
      return JSON.parse(element.getAttribute('content'))
    }
  }


  goback = () => {
    this.props.history.push('/')
  }

  render() {

    return <Board backgroundColor="#fff" style={ { position: 'fixed' } }>
      <Board width="85%" center height="80%" style={ { marginTop: '5rem' } }>
        <Board width="450px" height="100%" center
          style={ { position: 'relative' } }
        >
          { this.renderContent() }
        </Board>
      </Board>
    </Board>
  }

  renderContent() {
    const { session } = this.props
    const isPending = session && session.get('isLoading')
    return <div style={ {
      position: 'absolute',
      top: '50%',
      width: '100%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    } }>
      <Transition>
        {
          this.state.step === VERIFY_STEP.ABORD
          && <div className="verify-error center">
            <h2>{ this.getErrorMessage() }</h2>
            <RaisedButton
              primary
              buttonStyle={ { color: '#fff' } }
              onClick={ this.goback }>
              返回
            </RaisedButton>
          </div>
        }

        {
          this.state.step === VERIFY_STEP.SET_PASSWORD
          &&
          <ResetPassWord
            onSubmit={ isPending ? () => { } : this.setPassword }
            isPending={ isPending }
          />
        }

        {
          this.state.step === VERIFY_STEP.UPDATE_USER_INFO
          && <Personalization
            onSubmit={ isPending ? () => { } : this.updateProfile }
            isPending={ isPending }
          />
        }

        {
          this.state.step === VERIFY_STEP.DONE
          &&
          <div className="center">
            <h1 className="center">
              激活成功
            </h1>
            <RaisedButton primary onClick={ this.goback } buttonStyle={ { color: '#fff' } }>
              返回
            </RaisedButton>
          </div>
        }
      </Transition>
    </div>
  }
}




export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPage)



