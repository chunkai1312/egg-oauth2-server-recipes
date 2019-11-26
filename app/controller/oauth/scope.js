'use strict';

const Controller = require('egg').Controller;

class ScopeController extends Controller {
  async all() {
    const ctx = this.ctx;
    ctx.body = this.config.oAuth2Server.scopes;
  }
}

module.exports = ScopeController;
