// src/sagas/rootSaga.js
import { all } from 'redux-saga/effects'
import emailSaga from '../app/containers/emailList/saga'
import { loginSaga } from './containers/LogIn/saga'
import { aiEmailSaga } from './containers/AiInput/saga'

export default function* rootSaga() {
  yield all([
    emailSaga(),
    loginSaga(), 
    aiEmailSaga(),
  ])
}
