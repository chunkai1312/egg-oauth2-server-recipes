'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540806252168_764'

  // add your config here
  config.middleware = []

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
    password: 'example'
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
    accessTokenLifetime: 3600,
    refreshTokenLifetime: 1209600
  }

  config.passportLocal = {
    // usernameField: 'username',
    // passwordField: 'password'
  }

  return config
}
