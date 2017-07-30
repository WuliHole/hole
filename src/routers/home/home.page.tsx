import React = require('react')
import Container from '../../components/container'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import './homePage.less'
import { WallPaper } from '../../components/wallpaper/wallpaper'
import Transition from '../../components/transition'
import Logo from '../../components/logo'
export default
  class HomePage extends React.Component<void, void> {

  render() {
    const style = {
      textDecoration: 'none'
    }

    const buttonStyle = {
      backgroundColor: 'rgba(0,0,0,0)'
    }

    const wallpaper = WallPaper.defualtWallPaper
    const wallpaperStyle = WallPaper.defualStyle
    return <div className="homepage" >
      <WallPaper className="content center" src={ '../../assets/pattern.png' } style={ wallpaperStyle }>
        <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)' } }>
          <Transition transitionAppearTimeout={ 400 }>
            <Container size={ 4 } center className="modal">
              <div className="modal-title flex items-center">
                <Logo textColor="#fff" />
                {/* <div className="homepage-title h2">
                  HOLE
                </div>
                <div className="homepage-subtitle font-size-s" >
                  Alpha
                </div> */}
              </div>
              <div className="modal-content">
                <div>
                  <RaisedButton
                    children={ <Link style={ style } to={ 'login' }>登录</Link> }
                    buttonStyle={ buttonStyle }
                    style={ buttonStyle }
                  />
                </div>
                <div className="mt2">
                  <RaisedButton
                    children={ <Link style={ style } to={ 'signup' }>注册</Link> }
                    buttonStyle={ buttonStyle }
                    style={ buttonStyle }
                  />
                </div>
              </div>

            </Container >
          </Transition>
        </Container>
      </WallPaper>
    </div >
  }
}
