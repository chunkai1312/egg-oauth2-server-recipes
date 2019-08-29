'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {

  async index () {
    const ctx = this.ctx
    await ctx.render('home')
  }

  async welcome () {
    const ctx = this.ctx
    await ctx.render('welcome')
  }

  async admin () {
    const ctx = this.ctx
    await ctx.render('index')
  }

}

module.exports = HomeController
