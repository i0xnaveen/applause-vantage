const Hapi = require("@hapi/hapi")
// Bootstrap modules
require('dotenv').config()
const config = require("./config")
const { setupGraphQL } = require("./bootstrap/graphql")
const {init: initMysql} = require('./bootstrap/mysql')
const { initOAuthClient } = require('./src/components/oauth/handler/gmailAuth')
const { registerOAuthRoutes } = require('./src/components/oauth/routes')
async function init() {
  
  const server = Hapi.server({
    port: config.server.port || 3001,
    host: config.server.host || "0.0.0.0",
  })


  initOAuthClient({
    clientId: config.googApi.clientId,
    clientSecret: config.googApi.secretId,
    redirectUri: 'https://fictional-parakeet-w6q469w7xq5h9p4w-3001.app.github.dev/oauth2callback',
  })
  
  await setupGraphQL(server)
    
  registerOAuthRoutes(server)

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}


process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
  process.exit(1)
})

init()