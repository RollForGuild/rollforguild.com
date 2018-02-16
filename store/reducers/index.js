import { combineReducers } from 'redux'
import authentication from './authentication'
import characters from './characters'
import groups from './groups'
import rulesets from './rulesets'
import users from './users'





export default combineReducers({
  authentication,
  characters,
  groups,
  rulesets,
  users,
})
