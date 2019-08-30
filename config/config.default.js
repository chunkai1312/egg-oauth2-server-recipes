'use strict'

require('dotenv').config()

module.exports = appInfo => {
  const config = {

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: process.env.APP_NAME,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: process.env.APP_KEY,

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: process.env.APP_URL
  }

  /**
   * The middlewares of the application.
   *
   * @member {Array} Config#middleware
   * @see https://eggjs.org/en/basics/middleware.html
   */
  config.middleware = []

  /**
   * The configuration of `egg-security` plugin.
   *
   * @member {Object} Config#security
   * @see https://github.com/eggjs/egg-security
   */
  config.security = {
    // csrf: false
  }

  /**
   * The configuration of `egg-i18n` plugin.
   *
   * @member {Object} Config#i18n
   * @see https://github.com/eggjs/egg-i18n
   */
  config.i18n = {
    // defaultLocale: 'zh-TW'
  }

  /**
   * The configuration of `egg-sequelize` plugin.
   *
   * @member {Object} Config#sequelize
   * @see https://github.com/eggjs/egg-sequelize
   */
  config.sequelize = {
    dialect: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  }

  /**
   * The configuration of `egg-view` plugin.
   *
   * @member {Object} Config#view
   * @see https://github.com/eggjs/egg-view
   */
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }

  /**
   * The configuration of `egg-oauth2-server` plugin.
   *
   * @member {Object} Config#jwt
   * @see https://github.com/Azard/egg-oauth2-server
   */
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

  /**
   * The configuration used for mailer service via `nodemailer`.
   *
   * @member {Object} Config#mailer
   * @see https://github.com/nodemailer/nodemailer
   */
  config.mail = {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    },
    defaults: {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`
    }
  }

  return config
}
