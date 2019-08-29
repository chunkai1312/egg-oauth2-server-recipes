'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.passport.serializeUser(async (ctx, user) => user)
  app.passport.deserializeUser(async (ctx, user) => user)
}
