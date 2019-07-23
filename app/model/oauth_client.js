'use strict'

module.exports = app => {
  const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = app.Sequelize

  const OauthClient = app.model.define('oauth_client', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: INTEGER },
    name: { type: STRING, allowNull: false },
    secret: { type: STRING(100), allowNull: false },
    redirect: { type: TEXT, allowNull: false },
    personal_access_client: { type: BOOLEAN, allowNull: false },
    password_client: { type: BOOLEAN, allowNull: false },
    revoked: { type: BOOLEAN, allowNull: false },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'oauth_clients' })

  OauthClient.associate = function () {
    app.model.OauthClient.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
  }

  return OauthClient
}
