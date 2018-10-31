'use strict'

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, UUID } = app.Sequelize

  const OauthAccessToken = app.model.define('oauth_access_token', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    access_token: { type: STRING },
    expires_at: { type: DATE },
    scope: { type: TEXT },
    client_id: { type: UUID },
    user_id: { type: UUID }
  }, { tableName: 'oauth_access_tokens', timestamps: false })

  OauthAccessToken.associate = function () {
    app.model.OauthAccessToken.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
    app.model.OauthAccessToken.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' })
  }

  return OauthAccessToken
}
