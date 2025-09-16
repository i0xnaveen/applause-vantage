const UserProvider = require('../../src/components/users/provider')

const service = ([mysqlProvider]) => new UserProvider(mysqlProvider)

service.dependencies =['mysql/User']
module.exports = service
