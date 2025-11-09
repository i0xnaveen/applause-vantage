const Hapi = require("@hapi/hapi")
// Bootstrap modules
require('dotenv').config()
const config = require("./config")
const { setupGraphQL } = require("./bootstrap/graphql")
const {init: initMysql} = require('./bootstrap/mysql')
const { registerOAuthRoutes } = require('./src/components/oauth/routes')
const { registerEmailRoutes } = require('./src/components/gmail/routes')
const { registerAiMailRoutes } = require('./src/components/ai/routes')
const authMiddleware = require('./src/utils/authMiddleware')

async function init() {
  
  const server = Hapi.server({
    port: config.server.port || 3001,
    host: config.server.host || '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Origin', 'X-Requested-With'],
        additionalHeaders: ['Cache-Control', 'Pragma', 'Expires'],
        exposedHeaders: ['content-type', 'content-length'],
        maxAge: 86400,
      },
    },
  })

  server.ext('onPreResponse', (request, h) => {
    const response = request.response
    
    if (response.isBoom) {
      response.output.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
      response.output.headers['Access-Control-Allow-Credentials'] = 'true'
      response.output.headers['Access-Control-Allow-Headers'] = 'Accept, Authorization, Content-Type, If-None-Match, Origin, X-Requested-With'
      response.output.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    } else {
      // Handle successful responses
      response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
      response.header('Access-Control-Allow-Credentials', 'true')
      response.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, If-None-Match, Origin, X-Requested-With')
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    }
    
    return h.continue
  })

  // Handle OPTIONS requests explicitly
  server.route({
    method: 'OPTIONS',
    path: '/{path*}',
    options: {
      auth: false,
      cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Origin', 'X-Requested-With'],
      },
    },
    handler: (request, h) => h.response()
      .header('Access-Control-Allow-Origin', 'http://localhost:5173')
      .header('Access-Control-Allow-Credentials', 'true')
      .header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, If-None-Match, Origin, X-Requested-With')
      .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .code(200),
  })
  
  
  await initMysql({alter: true})
  // await setupGraphQL(server)
  await server.register(require('@hapi/cookie'))
  server.auth.scheme('jwt-auth', authMiddleware.scheme)
  server.auth.strategy('default', 'jwt-auth')
  server.auth.default('default')


  registerOAuthRoutes(server)
  registerEmailRoutes(server)
  registerAiMailRoutes(server)
  

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}


process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err)
  process.exit(1)
})

init()