'use strict'

module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, UUID } = app.Sequelize

  const OauthAuthorizationCode = app.model.define('oauth_authorization_code', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    authorization_code: { type: STRING },
    expires_at: { type: DATE },
    redirect_uri: { type: TEXT },
    scope: { type: TEXT },
    client_id: { type: UUID },
    user_id: { type: UUID }
  }, { tableName: 'oauth_authorization_codes', timestamps: false })

  OauthAuthorizationCode.associate = function () {
    app.model.OauthAuthorizationCode.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
    app.model.OauthAuthorizationCode.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' })
  }

  return OauthAuthorizationCode
}
