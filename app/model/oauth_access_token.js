'use strict'

module.exports = app => {
  const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = app.Sequelize

  const OauthAccessToken = app.model.define('oauth_access_token', {
    id: { type: STRING(100), primaryKey: true },
    user_id: { type: INTEGER },
    client_id: { type: INTEGER.UNSIGNED, allowNull: false },
    name: { type: STRING },
    scopes: { type: TEXT },
    revoked: { type: BOOLEAN, allowNull: false },
    created_at: { type: DATE },
    updated_at: { type: DATE },
    expires_at: { type: DATE }
  }, { tableName: 'oauth_access_tokens' })

  OauthAccessToken.associate = function () {
    app.model.OauthAccessToken.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
    app.model.OauthAccessToken.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' })
  }

  return OauthAccessToken
}
