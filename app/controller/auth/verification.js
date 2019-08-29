'use strict'

const crypto = require('crypto')
const Controller = require('egg').Controller

class VerificationController extends Controller {

  /**
   * Show the email verification notice.
   */
  async show () {
    const ctx = this.ctx
    await ctx.render('auth/verify')
  }

  /**
   * Mark the authenticated user's email address as verified.
   */
  async verify () {
    const ctx = this.ctx
    const id = ctx.params.id
    const user = await ctx.model.User.findByPk(id)

    if (!user) {
      ctx.throw(403, 'Invalid signature.')
    }

    if (user.hasVerifiedEmail()) {
      return ctx.redirect(ctx.get('referer'))
    }

    const original = `${this.config.url}${ctx.request.path}?expires=${ctx.query.expires}`
    const signature = crypto.createHmac('sha256', this.config.keys).update(original).digest().toString('hex')

    if (signature !== ctx.query.signature) {
      ctx.throw(403, 'Invalid signature.')
    }

    if (Date.now() > ctx.query.expires) {
      ctx.throw(403, 'Invalid signature.')
    }

    await user.markEmailAsVerified()
    ctx.login(user)

    ctx.flash('verified', true)
    ctx.redirect(ctx.get('referer'))
  }

  /**
   * Resend the email verification notification.
   */
  async resend () {
    const ctx = this.ctx
    const user = ctx.user
    await ctx.service.mail.sendVerificationMail(user)

    ctx.flash('resent', true)
    ctx.redirect(ctx.get('referer'))
  }

}

module.exports = VerificationController
