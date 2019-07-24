'use strict'

const path = require('path')

module.exports = appInfo => {
  const config = {}

  /**
   * The configuration of `egg-view-assets` plugin.
   *
   * @member {Object} Config#assets
   * @see https://github.com/eggjs/egg-view-assets
   */
  config.assets = {
    templatePath: path.join(appInfo.baseDir, 'app/view/index.html'),
    templateViewEngine: 'nunjucks',
    publicPath: '/public/'
  }

  return config
}
