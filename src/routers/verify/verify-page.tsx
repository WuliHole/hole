import * as React from 'react'
import * as classnames from 'classnames'
import Button from '../../components/button'
import Alert from '../../components/alert'
import Container from '../../components/container'
// import { updateArticleList } from '../actions/article';
import Board from '../../components/board'
import { setPassword, update } from '../../actions/session'
import ResetPassWord from './setPassword.form'
import Personalization from './personalizaion.form'
import { Link, HistoryBase } from 'react-router'
import Transition from '../../components/transition'
import { RaisedButton } from 'material-ui'

const connect = require('react-redux').connect

interface IVerifyPageProps extends React.Props<any> {
  session: any;
  setPassword: () => any
  updateProfile: () => any
  history: HistoryBase
  location
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
    updateProfile: () => dispatch(update('personalization'))
  }
}


enum VERIFY_STAGE {
  abort,
  setPassword,
  personalization,
  done
}

interface VerifyPageState {
  stage: number
}

class VerifyPage extends React.Component<IVerifyPageProps, VerifyPageState> {
  state: VerifyPageState = { stage: VERIFY_STAGE.setPassword }

  setStage = (stage: number) => this.setState({ stage })

  componentWillMount() {
    const errMsg = this.getErrorMessage()
    if (errMsg) {
      this.setStage(VERIFY_STAGE.abort)
    }
  }

  setPassword = () => {
    this.props
      .setPassword()
      .then(() => this.setStage(VERIFY_STAGE.personalization))
  }

  updateProfile = () => {
    this.props
      .updateProfile()
      .then(() => this.setStage(VERIFY_STAGE.done))
  }

  getErrorMessage(): string {
    const element = document.querySelector('meta[name="error-msg"]')
    if (element) {
      return element.getAttribute('content')
    }
  }

  render() {

    return <Board backgroundColor="#449bf7" style={ { position: 'fixed' } }>
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
          this.state.stage === VERIFY_STAGE.abort
          && <div className="verify-error">
            <h2>{ this.getErrorMessage() }</h2>
            <RaisedButton
              primary
              buttonStyle={ { color: '#fff' } }
              onClick={ () => this.props.history.push('/') }>
              返回
            </RaisedButton>
          </div>
        }

        {
          this.state.stage === VERIFY_STAGE.setPassword
          &&
          <ResetPassWord
            onSubmit={ isPending ? () => { } : this.setPassword }
            isPending={ isPending }
          />
        }

        {
          this.state.stage === VERIFY_STAGE.personalization
          && <Personalization
            onSubmit={ isPending ? () => { } : this.updateProfile }
            isPending={ isPending }
          />
        }

        {
          this.state.stage === VERIFY_STAGE.done
          &&
          <div>
            <Alert status="success" isVisible>
              <h1 className="center">
                注册完成
                  </h1>
            </Alert>
            <Button >
              <Link to="/">回到首页</Link>
            </Button>
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



