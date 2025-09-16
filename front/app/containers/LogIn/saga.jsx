import { call, put, takeLatest } from 'redux-saga/effects'
import {  login_sucesss } from './action'
import { LOGIN } from './constant'
import api from '../../services/api'

function* isLogged(){

  const response = yield call(api.isLoggedIn)
  console.log("the response is ", response)
  yield put(login_sucesss(response))
    
}

export function* loginSaga(){
  yield takeLatest(LOGIN, isLogged)

}