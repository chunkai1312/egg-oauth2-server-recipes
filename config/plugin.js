'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // enable plugins

  /**
   * validate plugin
   * @member {Function} Plugin#validate
   * @property {Boolean} enable
   * @see https://github.com/eggjs/egg-validate
   */
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  /**
   * nunjucks view plugin
   * @member {Function} Plugin#nunjucks
   * @property {Boolean} enable
   * @see https://github.com/eggjs/egg-view-nunjucks
   */
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  /**
   * sequelize plugin
   * @member {Function} Plugin#sequelize
   * @property {Boolean} enable
   * @see https://github.com/eggjs/egg-sequelize
   */
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  /**
   * passport plugin
   * @member {Function} Plugin#passport
   * @property {Boolean} enable
   * @see https://github.com/eggjs/egg-passport
   */
  passport: {
    enable: true,
    package: 'egg-passport',
  },

  /**
   * flash messages plugin.
   * @member {Function} Plugin#flash
   * @property {Boolean} enable
   * @see https://github.com/chunkai1312/egg-flash
   */
  flash: {
    enable: true,
    package: 'egg-flash',
  },

  /**
   * OAuth2 server plugin.
   * @member {Function} Plugin#oAuth2Server
   * @property {Boolean} enable
   * @see https://github.com/Azard/egg-oauth2-server
   */
  oAuth2Server: {
    enable: true,
    package: 'egg-oauth2-server',
  },
};
