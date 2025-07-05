// src/components/oauth/handler.js
const path = require('path')
const jwt  = require('jsonwebtoken')
const PDI = require('pdi-js')



const { generateEmailContent } = require('../../ai/handler/generateAiMail')
const { oAuthClient } = require('../../../utils/auth') 
const config = require("../../../../config")
const { log } = require('console')

const JWT_SECRET = "super_secret_key"

const loginHandler = async (request, h) => {
  const token = request.state?.authToken || request.headers?.authorization?.split(' ')[1]
  const UserProvider = await PDI.get('providers/users')
  let decoded, user

  if (token) {
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET)
      const userEmail = decoded.email
      user = await UserProvider.findOne({ email: userEmail })
    } catch (err) {
      console.error("JWT verification failed:", err)
    }
  }

  if (decoded && user) {
    return h.redirect('http://localhost:5173/emails')
  }

  const tempAuthUrl = oAuthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "select_account",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    redirect_uri: "http://localhost:3001/loginCallback",
  })

  return h.redirect(tempAuthUrl)

}



const loginCallbackHandler = async (request, h) => {
  const UserProvider = await PDI.get('providers/users')
  const code = request.query.code

  if (!code) return h.response('No code provided').code(400)

  try {
    const { tokens } = await oAuthClient.getToken({
      code,
      redirect_uri: "http://localhost:3001/loginCallback",
    })
    oAuthClient.setCredentials(tokens)

    const ticket = await oAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.googApi.clientId,
    })

    const payload = ticket.getPayload()
    const email = payload.email

    const existingUser = await UserProvider.findOne({ email })

    if (existingUser) {
      const jwtToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })

      return h.redirect('http://localhost:5173/emails').state('authToken', jwtToken, {
        isHttpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: '/',
      })
    } else {
      const consentAuthUrl = oAuthClient.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/gmail.readonly",
        ],
        redirect_uri: "http://localhost:3001/signupCallback",

      })

      return h.redirect(consentAuthUrl)
    }

  } catch (err) {
    console.error('Google Auth Callback Error:', err)
    return h.response('Authentication failed').code(500)
  }

}
const signupCallbackHandler = async (request, h) =>{

  const UserProvider = await PDI.get('providers/users')
  const code = request.query.code

  if (!code) return h.response('No code provided').code(400)

  try {
    const { tokens } = await oAuthClient.getToken({
      code,
      redirect_uri: "http://localhost:3001/signupCallback",
    })
    oAuthClient.setCredentials(tokens)

    const ticket = await oAuthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.googApi.clientId,
    })

    const payload = ticket.getPayload()
    const email = payload.email
    const name = payload.name

    await UserProvider.create({
      email,
      name,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
    })
    const jwtToken = jwt.sign({email}, JWT_SECRET, { expiresIn: '1h'})

    return h.redirect('http://localhost:5173/emails').state('authToken', jwtToken,{
      isHttpOnly: true,
      secure: false,
      sameSite: 'Lax',
      path: '/',
    })
  } 
  catch(err){
    console.log("The errrorrrrrrrrrrrrrrr ", err)
  }
  return
}


const loginAuthHandler = async (request, h) =>{

  const token = request.state?.authToken

  if (token) {
    return {
      authenticated: true,
    }
  }
  else{
    return {
      authenticated: false,
    }
  }
}
const testEmailGeneartion = async (prompt, email) => {

  const response = await generateEmailContent(prompt, email)
  console.log("The response was the", response)


}


module.exports = {
  loginHandler,
  loginCallbackHandler,
  signupCallbackHandler,
  loginAuthHandler,
}
