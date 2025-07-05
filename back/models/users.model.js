module.exports = function UserModel(sequelize, Datatypes){
  const User = sequelize.define('User',{
    id: {type: Datatypes.STRING, primaryKey: true},
    name: {type: Datatypes.STRING, unique: true},
    email: {type: Datatypes.STRING, unique: true},
    token: {type: Datatypes.STRING},
  },{
    tableName: "users",
  },

  )
  )

  return User
  return User
}