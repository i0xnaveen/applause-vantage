// src/store/reducers.js
import { combineReducers } from 'redux'
import emailReducer from '../app/containers/emailList/reducers'
import authReducer from './containers/LogIn/reducer'
import AiInputReducer from './containers/AiInput/reducer'
export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    emailList: emailReducer,
    auth: authReducer,
    aiContent: AiInputReducer,
    ...asyncReducers,
  })
}
