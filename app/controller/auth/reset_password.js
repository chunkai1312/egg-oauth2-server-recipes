'use strict'

const Controller = require('egg').Controller

class ResetPasswordController extends Controller {

  /**
   * Display the password reset view for the given token.
   *
   * If no token is present, display the link request form.
   */
  async showResetForm () {
    const ctx = this.ctx
    const email = ctx.query.email
    const token = ctx.params.token
    await ctx.render('auth/password/reset', { email, token })
  }

  /**
   * Reset the given user's password.
   */
  async reset () {
    const ctx = this.ctx

    const errors = ctx.app.validator.validate({
      email: { type: 'email', message: ctx.__('validation.email', { attribute: 'email' }) },
      token: { type: 'string', message: ctx.__('validation.required', { attribute: 'token' }) },
      password: { type: 'string', compare: 'password_confirmation', message: ctx.__('validation.confirmed', { attribute: 'password' }) },
      password_confirmation: { type: 'string', message: ctx.__('validation.required', { attribute: 'password_confirmation' }) }
    }, ctx.request.body)

    if (errors) {
      errors.forEach(error => ctx.flash(`errors.${error.field}`, error.message))
      return ctx.redirect(ctx.get('referer'))
    }

    const { email, token, password } = ctx.request.body
    const user = await this.ctx.model.User.findByEmail(email)
    const passwordReset = await this.ctx.model.PasswordReset.findByCredentials({ email, token })

    if (!user) {
      ctx.flash('errors.email', ctx.__('password.user'))
      return ctx.redirect(ctx.get('referer'))
    }

    if (!passwordReset || !passwordReset.isValid()) {
      ctx.flash('errors.email', ctx.__('password.token'))
      return ctx.redirect(ctx.get('referer'))
    }

    user.password = password
    await user.save()
    await ctx.login(user)

    ctx.flash('status', ctx.__('password.reset'))
    ctx.redirect('/home')
  }

}

module.exports = ResetPasswordController
