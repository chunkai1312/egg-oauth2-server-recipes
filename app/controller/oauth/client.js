'use strict';

const Controller = require('egg').Controller;

class ClientController extends Controller {

  /**
   * Get all of the clients for the authenticated user.
   */
  async forUser() {
    const ctx = this.ctx;
    const clients = await ctx.model.OauthClient.findByUserId(ctx.user.id);
    ctx.body = clients;
  }

  /**
   * Store a new client.
   */
  async store() {
    const ctx = this.ctx;

    const errors = ctx.app.validator.validate({
      name: { type: 'string', message: ctx.__('validation.required', { attribute: 'name' }) },
      redirect: { type: 'string', message: ctx.__('validation.required', { attribute: 'redirect' }) },
    }, ctx.request.body);

    if (errors) {
      ctx.body = errors;
      return;
    }

    const client = await ctx.model.OauthClient.create(ctx.request.body);
    ctx.body = client;
  }

  /**
   * Update the given client.
   */
  async update() {
    const ctx = this.ctx;

    const errors = ctx.app.validator.validate({
      name: { type: 'string', message: ctx.__('validation.required', { attribute: 'name' }) },
      redirect: { type: 'string', message: ctx.__('validation.required', { attribute: 'redirect' }) },
    }, ctx.request.body);

    if (errors) {
      ctx.body = errors;
      return;
    }

    const client = await ctx.model.OauthClient.findByPk(ctx.params.id);
    if (!client) ctx.throw(404);

    await client.update(ctx.request.body);

    ctx.body = client;
  }

  /**
   * Delete the given client.
   */
  async destroy() {
    const ctx = this.ctx;

    const client = await ctx.model.OauthClient.findByPk(ctx.params.id);
    if (!client) ctx.throw(404);

    await client.destroy();

    ctx.body = client;
  }

}

module.exports = ClientController;
