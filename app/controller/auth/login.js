'use strict';

const Controller = require('egg').Controller;
const ms = require('ms');

class LoginController extends Controller {

  /**
   * Show the application's login form.
   */
  async showLoginForm() {
    const ctx = this.ctx;
    await ctx.render('auth/login');
  }

  /**
   * Handle a login request to the application.
   */
  async login() {
    const ctx = this.ctx;

    const errors = ctx.app.validator.validate({
      email: { type: 'email', message: ctx.__('validation.email', { attribute: 'email' }) },
      password: { type: 'string', message: ctx.__('validation.required', { attribute: 'password' }) },
    }, ctx.request.body);

    if (errors) {
      errors.forEach(error => ctx.flash(`errors.${error.field}`, error.message));
      return ctx.redirect(ctx.get('referer'));
    }

    const { email, password } = ctx.request.body;
    const user = await ctx.model.User.findByEmail(email);

    if (!user || !user.authenticate(password)) {
      ctx.flash('errors.email', ctx.__('auth.failed'));
      return ctx.redirect(ctx.get('referer'));
    }

    if (ctx.request.body.remember_me) {
      ctx.session.maxAge = ms('30d');
    }

    await ctx.login(user);

    ctx.redirect(ctx.session.returnTo || ctx.get('referer') || '/home');
  }

  /**
   * Log the user out of the application.
   */
  async logout() {
    const ctx = this.ctx;
    ctx.session = null;
    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

}

module.exports = LoginController;
