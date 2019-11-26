'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {

  /**
   * Show the application registration form.
   */
  async showRegistrationForm() {
    const ctx = this.ctx;
    await ctx.render('auth/register');
  }

  /**
   * Handle a registration request for the application.
   */
  async register() {
    const ctx = this.ctx;

    const errors = ctx.app.validator.validate({
      name: { type: 'string', message: ctx.__('validation.required', { attribute: 'name' }) },
      email: { type: 'email', message: ctx.__('validation.email', { attribute: 'email' }) },
      password: { type: 'string', compare: 'password_confirmation', message: ctx.__('validation.confirmed', { attribute: 'password' }) },
      password_confirmation: { type: 'string', message: ctx.__('validation.required', { attribute: 'password_confirmation' }) },
    }, ctx.request.body);

    if (errors) {
      errors.forEach(error => ctx.flash(`errors.${error.field}`, error.message));
      return ctx.redirect(ctx.get('referer'));
    }

    const { name, email, password } = ctx.request.body;
    const user = await ctx.model.User.create({ name, email, password });
    await ctx.login(user);

    ctx.redirect('/home');
  }

}

module.exports = RegisterController;
