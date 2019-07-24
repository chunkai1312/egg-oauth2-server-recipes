'use strict'

module.exports = app => {
  const { STRING, INTEGER, TEXT, BOOLEAN, DATE } = app.Sequelize

  const OauthAuthCode = app.model.define('oauth_auth_code', {
    id: { type: STRING(100), primaryKey: true },
    user_id: { type: INTEGER, allowNull: false },
    client_id: { type: INTEGER, allowNull: false },
    scopes: { type: TEXT },
    revoked: { type: BOOLEAN, allowNull: false },
    expires_at: { type: DATE }
  }, { tableName: 'oauth_auth_codes', timestamps: false })

  OauthAuthCode.associate = function () {
    app.model.OauthAuthCode.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
    app.model.OauthAuthCode.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' })
  }

  return OauthAuthCode
}
