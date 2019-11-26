'use strict';

const Controller = require('egg').Controller;

class AuthorizationController extends Controller {

  /**
   * Authorize a client to access the user's account.
   */
  async authorize() {
    const ctx = this.ctx;
    const id = ctx.query.client_id;
    const client = await ctx.model.OauthClient.findByPk(id);
    const user = ctx.user;

    ctx.query.scope = ctx.query.scope || 'place-orders check-status';
    ctx.query.state = ctx.query.state || 'state';

    const scopes = ctx.query.scope
      ? this.config.oAuth2Server.scopes.filter(scope => ctx.query.scope.split(' ').includes(scope.id))
      : this.config.oAuth2Server.scopes.filter(scope => this.config.oAuth2Server.defaultScope.includes(scope.id));

    await ctx.render('authorize', {
      client,
      user,
      scopes,
      query: ctx.query,
    });
  }

}

module.exports = AuthorizationController;
