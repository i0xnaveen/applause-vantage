const { Sequelize } = require("sequelize")
require('dotenv').config()
const UserModel = require('../src/components/users/mysql/model')

let sequelizeConnection
let sequelizeConnection

try {
  console.log("pro",process.env.DB_HOST)
  
  sequelizeConnection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: 'localhost',
      dialect: "mysql",
      logging: console.log,
    },
  )
    },
  )
} catch (err) {
  console.error("Sequelize init error:", err)
  console.error("Sequelize init error:", err)
}


const User = UserModel(sequelizeConnection, Sequelize.DataTypes)


module.exports = {
  sequelizeConnection,
  User,
  init: async (syncOptions = {}) => {
    console.log("Initializing Sequelize sync...")
    return sequelizeConnection.sync(syncOptions)
    console.log("Initializing Sequelize sync...")
    return sequelizeConnection.sync(syncOptions)

  },
}
  },
}
