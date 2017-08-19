import React = require('react')

import ProfileForm from '../../../widgets/profile'
import { HistoryBase } from 'react-router'
import { update } from '../../../actions/session'
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
    return this.props.session.getIn(['user', 'id']).toString()
  }

  get profileInfo() {
    return this.props.session.getIn(['user'], this.userId)
  }

  onSave = (formName: string) => {
    let myUserId = this.props.session.getIn(['user,id'])
    const stateSync = this.profileInfo.get('id') === myUserId
    return this.updateProfile(formName, stateSync)
  }

  updateProfile = (formName, sync = false) => {
    const { dispatch } = this.props
    return dispatch(update(formName)).then(state => {
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
      <ProfileForm profile={ this.profileInfo } onSave={ this.onSave } visitorUid={ this.profileInfo.get('id') } />
    </div>
  }
}