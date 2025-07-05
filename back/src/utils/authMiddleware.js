const jwt = require('jsonwebtoken')
const Boom = require('@hapi/boom')

module.exports = {
  name: 'jwt-auth',
  scheme: (server, options) => ({
    authenticate: (request, h) => {
      try {
        const token =
            request.state?.authToken ||
            request.headers?.authorization?.split(' ')[1]

        if (!token) {
          throw new Error('No token provided')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key')

        return h.authenticated({ credentials: decoded })

      } catch (err) {
        throw Boom.unauthorized('Invalid or expired token')
      }
    },
  }),
}
