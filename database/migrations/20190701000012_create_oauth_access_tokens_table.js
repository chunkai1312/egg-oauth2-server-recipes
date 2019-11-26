'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable('oauth_access_tokens', {
      id: { type: STRING(100), primaryKey: true },
      user_id: { type: INTEGER },
      client_id: { type: INTEGER.UNSIGNED, allowNull: false },
      name: { type: STRING },
      scopes: { type: TEXT },
      revoked: { type: BOOLEAN, allowNull: false },
      created_at: { type: DATE },
      updated_at: { type: DATE },
      expires_at: { type: DATE },
    });

    await queryInterface.addIndex('oauth_access_tokens', { fields: [ 'user_id' ] });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_access_tokens');
  },
};
