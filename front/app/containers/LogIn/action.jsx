import { LOGIN, LOGIN_SUCCESS, LOGOUT } from "./constant"

export const login_sucesss = (payload) => {
  console.log("LOGIN_SUCCESS action payload:", payload)
  return {
    type: LOGIN_SUCCESS,
    payload,
  }
}

export const login = ()=> ({
  type:LOGIN,
})

export const logout = ()=> ({
  type:LOGOUT,
})