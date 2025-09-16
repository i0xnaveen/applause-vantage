import { AI_INPUT_MAIL, AI_INPUT_REFINE_MAIL, RESET, STATE } from "./constant"
import { makeStandardReducer } from "../../utils/reducer"
import { combineReducers } from 'redux-immutable'


export const DOMAIN = 'aiInput'
export const ROOT = `app/containers/${DOMAIN}`
const initialState = {
  aiContent: {},
}

function AiInputReducer(state = initialState, action) {
  switch (action.type) {

    case AI_INPUT_MAIL.SUCCESS:
      return { ...state, aiContent: action.payload }

    case AI_INPUT_MAIL.FAILURE:
      return { ...state, error: "Something went wrong" }

    case AI_INPUT_REFINE_MAIL.SUCCESS:
      return { ...state, aiContent: action.payload }
  
    case AI_INPUT_REFINE_MAIL.FAILURE:
      return { ...state, error: "Something went wrong" }

    default:
      return state
  }
}

const statusReducer = {
  [STATE.STATUS.AI_INPUT_MAIL]: makeStandardReducer(AI_INPUT_MAIL, [RESET[STATE.STATUS.AI_INPUT_MAIL]], [ROOT]),
  [STATE.STATUS.AI_INPUT_REFINE_MAIL]: makeStandardReducer(AI_INPUT_REFINE_MAIL, [RESET[STATE.STATUS.AI_INPUT_REFINE_MAIL]], [ROOT]),
}

export default combineReducers({
  [STATE.DATA.ROOT]:  AiInputReducer,
  [STATE.STATUS.ROOT]: combineReducers(statusReducer),
})