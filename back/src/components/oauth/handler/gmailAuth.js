// src/components/oauth/handler.js
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

const TOKEN_PATH = path.join(__dirname, 'token.json')

let oAuthClient

function initOAuthClient({ clientId, clientSecret, redirectUri }) {
  oAuthClient = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
  return oAuthClient
}

const loginHandler = (request, h) => {
  const authUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'profile',
      'email',
    ],
  })
  return h.redirect(authUrl)
}

const callbackHandler = async (request, h) => {
  const code = request.query.code
  if (!code) return h.response('No code provided').code(400)

  try {
    const { tokens } = await oAuthClient.getToken(code)
    oAuthClient.setCredentials(tokens)
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
    return h.redirect('/emails')
    } catch (err) {
    console.error('Token exchange error:', err)
    return h.response('❌ Authentication failed').code(500)
  }
}

const emailsHandler = async (request, h) => {
  if (!fs.existsSync(TOKEN_PATH)) {
    return h.response('🔐 Not authenticated. Go to /login').code(401)
  }

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH))
  oAuthClient.setCredentials(token)

  const gmail = google.gmail({ version: 'v1', auth: oAuthClient })

  try {
    const res = await gmail.users.messages.list({ userId: 'me' })
    const emails = []

    for (const msg of res.data.messages || []) {
      const detail = await gmail.users.messages.get({ userId: 'me', id: msg.id })

      const subject = detail.data.payload.headers.find((h) => h.name === 'Subject')?.value || '(no subject)'
      const from = detail.data.payload.headers.find((h) => h.name === 'From')?.value || '(unknown)'

      emails.push({ subject, from })
    }

    return h.response(emails).code(200)
  } catch (err) {
    console.error('Fetch email error:', err)
    return h.response('❌ Error fetching emails').code(500)
  }
}

module.exports = {
  initOAuthClient,
  loginHandler,
  callbackHandler,
  emailsHandler,
}
