'use strict';

const crypto = require('crypto');
const randomBytes = require('bluebird').promisify(require('crypto').randomBytes);
const ms = require('ms');
const Controller = require('egg').Controller;

class PersonalAccessTokenController extends Controller {

  /**
   * Get all of the clients for the authenticated user.
   */
  async forUser() {
    const ctx = this.ctx;
    const tokens = await ctx.model.OauthAccessToken.findPersonAccessTokensByUserId(ctx.user.id);
    ctx.body = tokens;
  }

  /**
   * Store a new client.
   */
  async store() {
    const ctx = this.ctx;

    // const errors = ctx.app.validator.validate({
    //   name: { type: 'string', message: ctx.__('validation.required', { attribute: 'name' }) },
    //   scopes: { type: 'string', message: ctx.__('validation.required', { attribute: 'redirect' }) },
    // }, ctx.request.body);

    // if (errors) {
    //   ctx.body = errors;
    //   return;
    // }

    const data = ctx.request.body;
    const id = randomBytes(256).then(function(buffer) {
      return crypto
        .createHash('sha1')
        .update(buffer)
        .digest('hex');
    });

    const token = await this.ctx.model.OauthAccessToken.create({
      id,
      user_id: ctx.user.id,
      client_id: ctx.config.oAuth2Server.personalAccessClientId,
      scopes: JSON.stringify(data.scopes),
      revoked: false,
      expires_at: Date.now() + ms('1y'),
    });

    ctx.body = { accessToken: token.id, token };
  }

  /**
   * Delete the given client.
   */
  async destroy() {
    const ctx = this.ctx;

    const token = await ctx.model.OauthAccessToken.findByPk(ctx.params.id);
    if (!token) ctx.throw(404);
    await token.destroy();

    ctx.status = 204;
  }

}

module.exports = PersonalAccessTokenController;
