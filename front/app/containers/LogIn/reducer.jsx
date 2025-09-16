import { LOGIN_SUCCESS, LOGOUT } from './constant'

const initialState = {
  authenticated: false,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: !!action.payload.authenticated,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
