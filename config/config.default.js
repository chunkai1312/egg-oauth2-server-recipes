'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540806252168_764'

  // add your config here
  config.middleware = ['errorHandler']

  config.security = {
    csrf: {
      enable: false
    }
  }

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres'
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.oAuth2Server = {
    debug: true,
    grants: ['authorization_code', 'client_credentials', 'password', 'refresh_token'],
    accessTokenLifetime: 31622400,
    refreshTokenLifetime: 31622400
  }

  /**
   * The configuration of `egg-jwt` plugin.
   *
   * @member {Object} Config#jwt
   * @see https://github.com/okoala/egg-jwt
   */
  config.jwt = {
    secret: config.keys
  }

  config.passportLocal = {
    usernameField: 'email',
    passwordField: 'password'
  }

  return config
}
