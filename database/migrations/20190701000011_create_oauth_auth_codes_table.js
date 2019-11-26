'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, TEXT, BOOLEAN, DATE } = Sequelize;

    await queryInterface.createTable('oauth_auth_codes', {
      id: { type: STRING(100), primaryKey: true },
      user_id: { type: INTEGER, allowNull: false },
      client_id: { type: INTEGER.UNSIGNED, allowNull: false },
      scopes: { type: TEXT },
      revoked: { type: BOOLEAN, allowNull: false },
      expires_at: { type: DATE },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_auth_codes');
  },
};
