'use strict'

const Controller = require('egg').Controller

class ForgotPasswordController extends Controller {

  /**
   * Display the form to request a password reset link.
   */
  async showLinkRequestForm () {
    const ctx = this.ctx
    await ctx.render('auth/password/email')
  }

  /**
   * Send a reset link to the given user.
   */
  async sendResetLinkEmail () {
    const ctx = this.ctx

    const errors = ctx.app.validator.validate({
      email: { type: 'email', message: ctx.__('validation.email', { attribute: 'email' }) }
    }, ctx.request.body)

    if (errors) {
      errors.forEach(error => ctx.flash(`errors.${error.field}`, error.message))
      return ctx.redirect(ctx.get('referer'))
    }

    const email = ctx.request.body.email
    const user = await ctx.model.User.findByEmail(email)

    if (!user) {
      ctx.flash('email', email)
      ctx.flash('errors.email', ctx.__('password.user'))
      return ctx.redirect(ctx.get('referer'))
    }

    await ctx.service.mail.sendPasswordResetMail(user)

    ctx.flash('status', ctx.__('password.sent'))
    ctx.redirect(ctx.get('referer'))
  }
}

module.exports = ForgotPasswordController
