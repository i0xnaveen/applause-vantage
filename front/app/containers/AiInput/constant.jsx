import { createActionSet } from "../../utils/constants"

export const ROOT = 'app/containers/AiInput'
const ACTIONS =['START', 'SUCCESS', 'FAILURE']

export const STATE = {
  DATA: {
    ROOT: 'data',
    AI_INPUT_MAIL: 'aiInputMail',
    AI_INPUT_REFINE_MAIL: 'aiInputRefineMail',
  },
  STATUS: {
    ROOT: 'status',
    AI_INPUT_MAIL: 'aiInputMail',
    AI_INPUT_REFINE_MAIL: 'aiInputRefineMail',
  },
}

export const RESET = {
  [STATE.STATUS.AI_INPUT_MAIL]: `${ROOT}/${STATE.STATUS.AI_INPUT_MAIL}/RESET`,
  [STATE.DATA.AI_INPUT_MAIL]: `${ROOT}/${STATE.DATA.AI_INPUT_MAIL}/RESET`,
  [STATE.STATUS.AI_INPUT_REFINE_MAIL]: `${ROOT}/${STATE.STATUS.AI_INPUT_REFINE_MAIL}/RESET`,
  [STATE.DATA.AI_INPUT_REFINE_MAIL]: `${ROOT}/${STATE.DATA.AI_INPUT_REFINE_MAIL}/RESET`,
}

const createSet = createActionSet(ROOT)

export const AI_INPUT_MAIL = createSet('AI_INPUT_MAIL', ...ACTIONS)
export const AI_INPUT_REFINE_MAIL = createSet('AI_INPUT_REFINE_MAIL', ...ACTIONS)