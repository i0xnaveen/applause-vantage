// src/components/oauth/routes.js
const {
  loginHandler,
  callbackHandler,
  emailsHandler,
} = require('./handler/gmailAuth')

function registerOAuthRoutes(server) {
  server.route([
    { method: 'GET', path: '/login', handler: loginHandler },
    { method: 'GET', path: '/oauth2callback', handler: callbackHandler },
    { method: 'GET', path: '/emails', handler: emailsHandler },
  ])
}

module.exports = { registerOAuthRoutes }
