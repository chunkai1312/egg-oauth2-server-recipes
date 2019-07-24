'use strict'

module.exports = appInfo => {
  const config = {

    /**
     * The debug mode of the application.
     *
     * @member {String} Config#debug
     */
    debug: true,

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: appInfo.name,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: appInfo.name + '_1541787300110_3713',

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: 'http://localhost:7001'
  }

  /**
   * The configuration of `egg-logger` plugin.
   *
   * @member {Object} Config#logger
   * @see https://github.com/eggjs/egg-logger
   */
  config.logger = {
    level: 'NONE',
    consoleLevel: 'NONE'
  }

  /**
   * The configuration of `egg-sequelize` plugin.
   *
   * @member {Object} Config#sequelize
   * @see https://github.com/eggjs/egg-sequelize
   */
  config.sequelize = {
    dialect: process.env.DB_CONNECTION || 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres'
  }

  return config
}
