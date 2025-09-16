import { call, put, takeLatest } from 'redux-saga/effects'

import { aiInputMail, aiInputMailSuccess, aiInputRefineMail } from './actions'
import { AI_INPUT_MAIL, AI_INPUT_REFINE_MAIL } from './constant'
import api from '../../services/api'

function* fetchEmailContent(action){
  const content = action.payload

  const response = yield call(api.fetchAiEmailContent,content)
  yield put(aiInputMailSuccess(response.data))
}

function* fetchRefineEmailContent(action) {
  const content = action.payload

  const response = yield call (api.fetchRefineMailContent, content)
  yield put(aiInputMailSuccess(response.data))
}

export function* aiEmailSaga(){
  yield takeLatest(AI_INPUT_MAIL.START, fetchEmailContent)
  yield takeLatest(AI_INPUT_REFINE_MAIL.START, fetchRefineEmailContent)
}