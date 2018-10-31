'use strict'

module.exports = app => {
  const { INTEGER, TEXT, BOOLEAN } = app.Sequelize

  const OauthScope = app.model.define('oauth_scopes', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    scope: { type: TEXT },
    is_default: { type: BOOLEAN }
  }, { tableName: 'oauth_scopes', timestamps: false })

  return OauthScope
}
