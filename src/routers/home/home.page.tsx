import React = require('react')
import Container from '../../components/container'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import './homePage.less'
import { WallPaper, defualtWallPaper } from '../../components/wallpaper/wallpaper'

export default
  class HomePage extends React.Component<void, void> {

  render() {
    const style = {
      textDecoration: 'none'
    }
    const buttonStyle = {
      backgroundColor: 'rgba(0,0,0,0)'
    }
    return <div className="homepage" >
      <WallPaper className="content center" src={ defualtWallPaper }>
        <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)' } }>
          <Container size={ 4 } center style={ { backgroundColor: 'rgba(0,0,0,0)' } }>
            <div className="homepage-title h2">
              HOLE
              <span className="font-size-s" style={ { marginLeft: '5px' } }></span>
            </div>
            <div className="homepage-subtitle font-size-s" >
              Alpha
            </div>
            <div className="mt2">
              <RaisedButton
                children={ <Link style={ style } to={ 'login' }>登录</Link> }
                buttonStyle={ buttonStyle }
                style={ buttonStyle }
              />
            </div>
            <div>
              <RaisedButton
                children={ <Link style={ style } to={ 'signup' }>注册</Link> }
                buttonStyle={ buttonStyle }
                style={ buttonStyle }
              />
            </div>
          </Container >
        </Container>
      </WallPaper>
    </div >
  }
}
