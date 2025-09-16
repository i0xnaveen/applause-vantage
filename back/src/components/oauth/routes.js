const {
  loginHandler,
  loginCallbackHandler,
  loginAuthHandler,
  signupCallbackHandler,
} = require('./handler/gmailAuth')

function registerOAuthRoutes(server) {
  server.route([
    { method: 'GET', path: '/login',
      options: { auth: false },
      handler: loginHandler },
    { method: 'GET', path: '/loginCallback', 
      options: { auth: false },
      handler: loginCallbackHandler },
    { method: 'GET', path: '/signupCallback', 
      options: { auth: false },
      handler: signupCallbackHandler },
    { method: 'GET', path: '/auth/check',
      options : { auth: false}, 
      handler:  loginAuthHandler},
  ])
}

module.exports = { registerOAuthRoutes }
