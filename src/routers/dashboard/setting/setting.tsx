import React = require('react')

import ProfileForm from '../../../widgets/profile'
import { HistoryBase } from 'react-router'
import { updateUserInfo } from '../../../actions/session'
import { isRejectedAction } from '../../../actions/utils'
import { GET_PROFILE_SUCCESS } from '../../../constants/profile'

interface SettingViewProps {
  history: HistoryBase
  viewContent: JSX.Element
  posts
  session
  profile
  dispatch
}

interface SettingViewState {

}

export default class SettingView extends React.PureComponent<SettingViewProps, SettingViewState> {
  constructor(props) {
    super(props)
  }

  get userId() {
    const uid = this.props.session.getIn(['user', 'id'])
    if (uid) {
      return uid.toString()
    }
  }

  get profileInfo() {
    return this.props.session.getIn(['user'])
  }

  onSave = (formName: string) => {
    return this.updateProfile(formName, true)
  }

  updateProfile = (formName, sync = false) => {
    const { dispatch } = this.props
    return dispatch(updateUserInfo(formName)).then(state => {
      if (!isRejectedAction(state)) {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: state.payload,
          meta: state.meta
        })
      }
    })
  }
  render() {
    return <div className="SettingView" >
      {
        this.profileInfo
        &&
        <ProfileForm profile={ this.profileInfo } onSave={ this.onSave } visitorUid={ this.userId } />
      }
    </div>
  }
}