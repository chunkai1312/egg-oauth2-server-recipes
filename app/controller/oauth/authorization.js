'use strict'

const Controller = require('egg').Controller

class AuthorizationController extends Controller {

  /**
   * Authorize a client to access the user's account.
   */
  async authorize () {
    const ctx = this.ctx
    const id = ctx.query.client_id
    const client = await ctx.model.OauthClient.findByPk(id)

    await ctx.render('authorize', {
      client: client,
      user: ctx.user,
      query: ctx.query
    })
  }

}

module.exports = AuthorizationController
