'use strict';

module.exports = app => {
  const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = app.Sequelize;

  const OauthAccessToken = app.model.define('oauth_access_token', {
    id: { type: STRING(100), primaryKey: true },
    user_id: { type: INTEGER },
    client_id: { type: INTEGER, allowNull: false },
    name: { type: STRING },
    scopes: { type: TEXT },
    revoked: { type: BOOLEAN, allowNull: false },
    created_at: { type: DATE },
    updated_at: { type: DATE },
    expires_at: { type: DATE },
  }, {
    tableName: 'oauth_access_tokens',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  OauthAccessToken.associate = function() {
    app.model.OauthAccessToken.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
    app.model.OauthAccessToken.belongsTo(app.model.OauthClient, { as: 'client', foreignKey: 'client_id' });
  };

  OauthAccessToken.findPersonAccessTokensByUserId = function(id) {
    return this.findAll({
      where: { client_id: app.config.oAuth2Server.personalAccessClientId, user_id: id },
      include: [{ model: app.model.OauthClient, as: 'client' }],
    });
  };

  return OauthAccessToken;
};
