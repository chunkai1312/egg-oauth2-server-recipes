'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const { provider } = user

    if (provider === 'local') {
      const existsUser = await ctx.model.User.findOne({ where: { email: user.username } })
      if (!existsUser) return false
      const isAuthenticated = existsUser.authenticate(user.password)
      return isAuthenticated ? existsUser : false
    }

    return user
  })

  app.passport.serializeUser(async (ctx, user) => user)
  app.passport.deserializeUser(async (ctx, user) => user)
}
