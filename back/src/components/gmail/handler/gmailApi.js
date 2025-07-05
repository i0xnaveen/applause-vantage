const { google } = require('googleapis')
const {oAuthClient} = require('../../../utils/auth')
const jwt = require('jsonwebtoken')
const PDI = require('pdi-js')
const { gmail } = require('googleapis/build/src/apis/gmail')
const JWT_SECRET = "super_secret_key" 

const emailList = async (request, h) => {
  const token = request.state.authToken

  if (!token) {
    return h.response({ error: "Unauthorized" }).code(401)
  }

  let decoded

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return h.response({ error: "Invalid or expired token" }).code(401)
  }

  const userEmail = decoded.email
  const UserProvider = await PDI.get('providers/users')
  const user = await UserProvider.findOne({ email: userEmail })
  if (!user) {
    return h.response({ error: "User not found" }).code(404)
  }

  let { access_token, refresh_token, expiry_date } = user
  const isExpired = !expiry_date || new Date(expiry_date) < new Date()
  if (isExpired && refresh_token) {
    oAuthClient.setCredentials({ refresh_token })
    const newTokens = await oAuthClient.refreshAccessToken()
    access_token = newTokens.credentials.access_token
    expiry_date = newTokens.credentials.expiry_date
  }
  await UserProvider.update(
    { email: userEmail },
    {
      access_token,
      expiry_date: expiry_date ? new Date(expiry_date) : null,
    },
  )
  oAuthClient.setCredentials({ access_token })

  const gmail = google.gmail({ version: 'v1', auth: oAuthClient })
  
  try {
    const res = await gmail.users.messages.list({ userId: 'me' })
    const emails = []
  
    for (const msg of res.data.messages || []) {
      const id = msg.id
      const detail = await gmail.users.messages.get({ userId: 'me', id })

      console.log("the detail message is : ", detail)

      const payload = detail.data.payload
      const body = getPlainTextBody(payload)
  
      const subject = detail.data.payload.headers.find((h) => h.name === 'Subject')?.value || '(no subject)'
      const from = detail.data.payload.headers.find((h) => h.name === 'From')?.value || '(unknown)'
  
      emails.push({ subject, from, body, id })
    }
    return h.response(emails).code(200)
  } catch (err) {
    console.error('Fetch email error:', err)
    return h.response('❌ Error fetching emails').code(500)
  }
}
function getPlainTextBody(payload) {
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain') {
        const buff = Buffer.from(part.body.data, 'base64')
        return buff.toString('utf-8')
      }
    }
  }
  
  // If not multipart, check main body
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString('utf-8')
  }
  
  return '(No plain text body found)'
}

async function getEmailById( messageId ){

  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full',
  })

  const message = res.data
  const headers = message.payload.headers
  return{
    subject: headers.find( (h) => h.name === 'Subject')?.value || '',
    from: headers.find((h) => h.name === 'From')?.value || '',
    date: headers.find((h) => h.name === 'Date')?.value || '',
    body: getPlainTextBody(message.payload),
  }

}
  
module.exports ={
  emailList,
  getEmailById,
}