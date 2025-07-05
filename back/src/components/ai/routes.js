const { generateEmailContent, generateRefineEmailContent } = require('./handler/generateAiMail')

function registerAiMailRoutes(server) {
  server.route([
    {
      method: 'POST',
      path: '/ai/mail',
      handler: generateEmailContent, 
    },
    {
      method: 'POST',
      path: '/ai/refineMail',
      handler: generateRefineEmailContent,
    }
  ])
}

module.exports = { registerAiMailRoutes }
