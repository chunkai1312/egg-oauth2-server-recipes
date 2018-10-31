'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app

  router.get('/user', controller.auth.index)
  router.get('/login', middleware.ensureLoggedOut(), controller.auth.login)
  router.post('/login', app.passport.authenticate('local', { failureRedirect: '/login' }))
  router.get('/logout', controller.auth.logout)

  router.get('/oauth/authorize', middleware.ensureLoggedIn(), controller.auth.authorize)
  router.all('/oauth/authorize/decision', middleware.ensureLoggedIn(), app.oAuth2Server.authorize())
  router.all('/oauth/token', app.oAuth2Server.token())
  router.get('/oauth/client', app.oAuth2Server.authenticate(), controller.auth.client)
  router.get('/oauth/user', app.oAuth2Server.authenticate(), controller.auth.user)
}
