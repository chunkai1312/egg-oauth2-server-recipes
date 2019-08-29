'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app

  router.get('/', controller.home.welcome)
  router.get('/home', middleware.ensureLoggedIn(), middleware.ensureEmailVerified(), controller.home.index)

  router.get('/register', middleware.ensureLoggedOut(), controller.auth.register.showRegistrationForm)
  router.post('/register', middleware.ensureLoggedOut(), controller.auth.register.register)
  router.get('/login', middleware.ensureLoggedOut(), controller.auth.login.showLoginForm)
  router.post('/login', middleware.ensureLoggedOut(), controller.auth.login.login)
  router.all('/logout', middleware.ensureLoggedIn(), controller.auth.login.logout)
  router.get('/password/reset', middleware.ensureLoggedOut(), controller.auth.forgotPassword.showLinkRequestForm)
  router.post('/password/email', middleware.ensureLoggedOut(), controller.auth.forgotPassword.sendResetLinkEmail)
  router.get('/password/reset/:token', middleware.ensureLoggedOut(), controller.auth.resetPassword.showResetForm)
  router.post('/password/reset', middleware.ensureLoggedOut(), controller.auth.resetPassword.reset)
  router.get('/email/verify', middleware.ensureLoggedIn(), controller.auth.verification.show)
  router.get('/email/verify/:id', middleware.ensureLoggedIn(), controller.auth.verification.verify)
  router.get('/email/resend/', middleware.ensureLoggedIn(), controller.auth.verification.resend)

  router.all('/oauth/token', app.oAuth2Server.token())
  router.get('/oauth/authorize', middleware.ensureLoggedIn(), controller.oauth.authorization.authorize)
  router.all('/oauth/authorize/decision', middleware.ensureLoggedIn(), app.oAuth2Server.authorize())
  router.get('/oauth/clients', middleware.ensureLoggedIn(), controller.oauth.client.forUser)
  router.post('/oauth/clients', middleware.ensureLoggedIn(), controller.oauth.client.store)
  router.put('/oauth/clients/:id', middleware.ensureLoggedIn(), controller.oauth.client.update)
  router.del('/oauth/clients/:id', middleware.ensureLoggedIn(), controller.oauth.client.destroy)

  router.get('/admin/*', controller.home.admin)
}
