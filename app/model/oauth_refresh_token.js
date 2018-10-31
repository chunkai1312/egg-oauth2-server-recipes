'use strict'

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, UUID } = app.Sequelize

  const OauthRefreshToken = app.model.define('oauth_refresh_token', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    refresh_token: { type: STRING },
    expires_at: { type: DATE },
    scope: { type: TEXT },
    client_id: { type: UUID },
    user_id: { type: UUID }
  }, { tableName: 'oauth_refresh_tokens', timestamps: false })

  OauthRefreshToken.associate = function () {
    app.model.OauthRefreshToken.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
    app.model.OauthRefreshToken.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' })
  }

  return OauthRefreshToken
}
