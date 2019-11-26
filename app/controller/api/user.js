'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async authenticate() {
    const ctx = this.ctx;
    const user = this.ctx.state.oauth.token.user;
    ctx.body = user;
  }
}

module.exports = UserController;
