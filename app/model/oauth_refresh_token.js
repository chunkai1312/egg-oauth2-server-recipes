'use strict'

module.exports = app => {
  const { STRING, BOOLEAN, DATE } = app.Sequelize

  const OauthRefreshToken = app.model.define('oauth_refresh_token', {
    id: { type: STRING(100), primaryKey: true },
    access_token_id: { type: STRING(100), allowNull: false },
    revoked: { type: BOOLEAN, allowNull: false },
    expires_at: { type: DATE }
  }, {
    tableName: 'oauth_refresh_tokens',
    timestamps: false
  })

  OauthRefreshToken.associate = function () {
    app.model.OauthRefreshToken.belongsTo(app.model.OauthAccessToken, { as: 'accessToken', foreignKey: 'access_token_id' })
  }

  return OauthRefreshToken
}
