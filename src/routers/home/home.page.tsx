import React = require('react')
import { HistoryBase } from 'react-router'
import Container from '../../components/container'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import './homePage.less'
import { WallPaper } from '../../components/wallpaper/wallpaper'
import Transition from '../../components/transition'
import Logo from '../../components/logo'

interface HomePageProps {
  history: HistoryBase
}

export default
  class HomePage extends React.Component<HomePageProps, {}> {

  signin = () => {
    this.props.history.push('/login')
  }

  signup = () => {
    this.props.history.push('/signup')
  }

  render() {
    const style = {
      textDecoration: 'none',
      color: '#000'
    }

    const buttonStyle = {
      width: '130px'
    }


    return <div className="homepage" >
      <h6 className="absolute version font-size-s">Alhpa</h6>
      <WallPaper className="content center " >
        <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)', minHeight: '100vh' } } className="relative">
          <div className="absolute wrapper">
            <Transition transitionAppearTimeout={ 400 }>
              <div >
                <h1 className="serif title-second">
                  <span className="inline-block rotate-text">!</span>
                  讲个笑话
                </h1>
                <h1 className="serif title-primary">做中文世界最好的博客网站</h1>
                <RaisedButton
                  onClick={ this.signin }
                  secondary
                  children={ <Link style={ style } to={ 'login' }>登录</Link> }
                  buttonStyle={ buttonStyle }
                  style={ buttonStyle }
                />
              </div>
              <div className="mt2">
                <RaisedButton
                  secondary
                  onClick={ this.signup }
                  children={ <Link style={ style } to={ 'signup' }>注册</Link> }
                  buttonStyle={ buttonStyle }
                  style={ buttonStyle }
                />
              </div>
              {/* <Container size={ 4 } center className="modal">
              <div className="modal-title flex items-center">
                <Logo textColor="#fff" />
              </div>
              {/* <div className="modal-content"> */ }

              {/* </div> */ }

              {/* </Container > */ }
            </Transition>
          </div>
        </Container>
      </WallPaper>
    </div >
  }
}
