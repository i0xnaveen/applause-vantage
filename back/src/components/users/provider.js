const { v4: uuidV4 } = require('uuid')

class UserProvider {
  constructor(mysqlProvider) {
    this.mysqlProvider = mysqlProvider
  }

  async create(payload) {
    const {
      uid = uuidV4(),
      email,
      name,
      access_token,
      refresh_token,
      expiry_date,
    } = payload

    try {
      const existingUser = await this.mysqlProvider.findOne({
        where: { email },
      })

      if (!existingUser) {
        // ✅ User not found → create new
        return await this.mysqlProvider.create({
          id: uid,
          name,
          email,
          access_token,
          refresh_token,
          expiry_date,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      // ✅ Only update if token is different
      if (existingUser.access_token !== access_token || existingUser.refresh_token !== refresh_token) {
        await this.mysqlProvider.update(
          { access_token, refresh_token, updatedAt: new Date() },
          { where: { email } },
        )
      }

      return existingUser

    } catch (err) {
      console.error("The error was", err)
      throw err
    }
  }

  async update (payload){
    const { email, ...updates } = payload
    await this.mysqlProvider.update(
      {
        ...updates,
        updatedAt: new Date(),
      },
      { where: { email } },
    )
  }

  async findOne(payload){
    const { email } = payload
    const existingUser = await this.mysqlProvider.findOne({
      where: { email },
    })
    return existingUser
  }
}

module.exports = UserProvider
