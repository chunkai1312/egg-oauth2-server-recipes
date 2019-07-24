'use strict'

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize

  const OauthScope = app.model.define('oauth_personal_access_client', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: INTEGER, allowNull: false },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'oauth_personal_access_clients' })

  return OauthScope
}
