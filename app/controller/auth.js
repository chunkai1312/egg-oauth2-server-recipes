'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = ctx.user
  }

  async login () {
    const ctx = this.ctx
    await ctx.render('login.html')
  }

  async logout () {
    const ctx = this.ctx
    ctx.logout()
    ctx.redirect(ctx.get('referer') || '/')
  }

  async authorize () {
    const ctx = this.ctx
    const client = await ctx.model.OauthClient.findById(ctx.query.client_id)
    await ctx.render('authorize.html', {
      client: client,
      user: ctx.user,
      query: ctx.query
    })
  }

  async client () {
    const ctx = this.ctx
    ctx.body = ctx.state.oauth.token.client
  }

  async user () {
    const ctx = this.ctx
    ctx.body = ctx.state.oauth.token.user
  }
}

module.exports = AuthController
