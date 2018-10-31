'use strict'

/**
 * Sequelize plugin.
 *
 * @see https://github.com/eggjs/egg-sequelize
 */
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

/**
 * Nunjucks view plugin.
 *
 * @see https://github.com/eggjs/egg-view-nunjucks
 */
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

/**
 * OAuth2 server plugin.
 *
 * @see https://github.com/Azard/egg-oauth2-server
 */
exports.oAuth2Server = {
  enable: true,
  package: 'egg-oauth2-server'
}

/**
 * Passport plugin.
 *
 * @see https://github.com/eggjs/egg-passport
 */
exports.passport = {
  enable: true,
  package: 'egg-passport'
}

/**
 * Local passport plugin.
 *
 * @see https://github.com/eggjs/egg-passport-local
 */
exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local'
}
