'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index () {
    await this.ctx.render('home/index.js')
  }

  async home () {
    await this.ctx.render('home.html')
  }
}

module.exports = HomeController
