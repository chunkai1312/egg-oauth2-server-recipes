'use strict'

const Controller = require('egg').Controller

class AuthController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = ctx.user
  }

  async register () {
    const ctx = this.ctx
    await ctx.render('register/index.js', { error: ctx.flash('error') })
  }

  async login () {
    const ctx = this.ctx
    await ctx.render('login/index.js', { error: ctx.flash('error') })
  }

  async logout () {
    const ctx = this.ctx
    ctx.session = null
    ctx.logout()
    ctx.redirect(ctx.get('referer') || '/')
  }

  async authorize () {
    const ctx = this.ctx
    const client = await ctx.model.OauthClient.findByPk(ctx.query.client_id)
    await ctx.render('authorize.js', {
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
