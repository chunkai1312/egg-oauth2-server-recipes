'use strict'

const ms = require('ms')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const { provider } = user

    if (provider === 'local') {
      const existsUser = await ctx.model.User.findOne({ where: { email: user.username } })

      if (!existsUser) {
        ctx.flash('error', 'Unknown User')
        return null
      }

      const isAuthenticated = existsUser.authenticate(user.password)

      if (!isAuthenticated) {
        ctx.flash('error', 'Unknown Password')
        return null
      }

      if (ctx.request.body.remember_me) {
        ctx.session.maxAge = ms('30d')
      }

      return existsUser
    }

    return user
  })

  app.passport.serializeUser(async (ctx, user) => user)
  app.passport.deserializeUser(async (ctx, user) => user)
}
