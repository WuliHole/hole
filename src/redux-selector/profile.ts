import { Map } from 'immutable'
export type UserMap = Map<string, Map<keyof User, any>>
export const selectUserInfo = state => state.profile.get('meta')