
function UserModel(sequelize, Datatypes){
  const User = sequelize.define('User',{
    id: {type: Datatypes.STRING, primaryKey: true},
    name: {type: Datatypes.STRING, unique: true},
    email: {type: Datatypes.STRING, unique: true},
    access_token: {type: Datatypes.TEXT},
    refresh_token: {type: Datatypes.TEXT},
    expiry_date: {type: Datatypes.DATE},

  },{
    tableName: "users",
  },{
    timestamps: false,
  },
  
  )
  
  return User
}

module.exports = UserModel