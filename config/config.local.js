'use strict'

module.exports = appInfo => {
  const config = {

    /**
     * The debug mode of the application.
     *
     * @member {String} Config#name
     */
    debug: process.env.APP_DEBUG || false,

    /**
     * The name of the application.
     *
     * @member {String} Config#name
     */
    name: process.env.APP_NAME || appInfo.name,

    /**
     * The key that signing cookies. It can contain multiple keys seperated by `,`.
     *
     * @member {String} Config#keys
     */
    keys: process.env.APP_KEY || appInfo.name + '_1565359379527_3245',

    /**
     * The base URL of the application.
     *
     * @member {String} Config#url
     */
    url: process.env.APP_URL || 'http://localhost:7001'
  }

  /**
   * The configuration of `egg-view-assets` plugin.
   *
   * @member {Object} Config#assets
   * @see https://github.com/eggjs/egg-view-assets
   */
  config.assets = {
    // templatePath: process.cwd() + '/app/view/index.html',
    // templateViewEngine: 'nunjucks',
    devServer: {
      debug: true,
      autoPort: true,
      command: 'cross-env umi dev --port={port}',
      // portPath: process.cwd() + '/app/run/assetsPort',
      env: {
        APP_ROOT: process.cwd() + '/app/assets/js',
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:{port}'
      }
    }
  }

  return config
}
