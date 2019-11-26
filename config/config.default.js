'use strict';

require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    /**
     * The name of the application.
     * @member {String} Config#name
     */
    name: process.env.APP_NAME || appInfo.name,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     * @member {String} Config#keys
     */
    keys: process.env.APP_KEY || appInfo.name + '_1567408211371_3558',

    /**
     * The base URL of the application.
     * @member {String} Config#url
     */
    url: process.env.APP_URL,
  };

  /**
   * The middlewares of the application.
   * @member {Array} Config#middleware
   * @see https://eggjs.org/en/basics/middleware.html
   */
  config.middleware = [];

  /**
   * The configuration of `egg-security` plugin.
   * @member {Object} Config#security
   * @see https://github.com/eggjs/egg-security
   */
  config.security = {
    csrf: {
      ignore: [
        '/oauth/token',
        '/api',
      ],
    },
  };

  /**
   * The configuration of `egg-view` plugin.
   * @member {Object} Config#view
   * @see https://github.com/eggjs/egg-view
   */
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  /**
   * The Configuration of `egg-sequelize` plugin.
   * @member {Object} Config#sequelize
   * @see https://github.com/eggjs/egg-sequelize
   */
  config.sequelize = {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  };

  /**
   * The configuration of `egg-oauth2-server` plugin.
   * @member {Object} Config#oAuth2Server
   * @see https://github.com/Azard/egg-oauth2-server
   */
  config.oAuth2Server = {
    debug: true,
    grants: [ 'authorization_code', 'client_credentials', 'password', 'refresh_token' ],
    scopes: [
      { id: 'place-orders', description: 'Place orders' },
      { id: 'check-status', description: 'Check order status' },
    ],
    defaultScope: [],
    accessTokenLifetime: 60 * 60 * 24 * 365.25,
    refreshTokenLifetime: 60 * 60 * 24 * 365.25,
    personalAccessClientId: 1,
  };

  /**
   * The configuration used for mailer service via `nodemailer`.
   * @member {Object} Config#mailer
   * @see https://github.com/nodemailer/nodemailer
   */
  config.mail = {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    defaults: {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
    },
  };

  return config;
};
