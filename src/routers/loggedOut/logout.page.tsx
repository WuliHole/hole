import React = require('react')
import CommonAppBar from '../../widgets/commonAppBar'
import Board from '../../components/board'
import Container from '../../components/container'
import './logout.less'
const secureIcon = require('./secure.svg')
export default ({ history }) => {
  return (
    <Board>
      <CommonAppBar history={ history } />
      <div className="centered-content">
        <img src={ secureIcon } alt="安全退出" style={ { height: 120, width: 120 } } />
        <h6>成功退出,感谢使用HOLE。</h6>
      </div>
    </Board>
  )
}