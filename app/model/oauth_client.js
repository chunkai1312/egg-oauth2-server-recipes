'use strict'

module.exports = app => {
  const { STRING, TEXT, UUID, UUIDV4 } = app.Sequelize

  const OauthClient = app.model.define('oauth_client', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    name: { type: STRING },
    secret: { type: STRING },
    redirect_uri: { type: TEXT },
    grant_types: { type: STRING },
    scope: { type: TEXT },
    user_id: { type: UUID }
  }, { tableName: 'oauth_clients', timestamps: false })

  OauthClient.associate = function () {
    app.model.OauthClient.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' })
  }

  return OauthClient
}
