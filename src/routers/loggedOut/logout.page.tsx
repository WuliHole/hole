import React = require('react')
import CommonAppBar from '../../widgets/commonAppBar'
import Board from '../../components/board'
import Container from '../../components/container'
import './logout.less'
import { RaisedButton } from 'material-ui'
import Transition from 'app/components/transition'
const secureIcon = require('./secure.svg')

export default ({ history }) => {
  return (
    <Board>
      <CommonAppBar history={ history } />
      <Transition  >
        <div className="centered-content relative">
          <div className="logout-wrapper absolute">
            <h1 >成功退出,感谢使用HOLE</h1>
            <RaisedButton
              primary
              label="返回"
              onClick={ () => history.push('/') }
              style={ { width: '130px' } } />
          </div>
        </div>
      </Transition  >
    </Board >
  )
}