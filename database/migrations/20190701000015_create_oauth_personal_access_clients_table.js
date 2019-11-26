'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;

    await queryInterface.createTable('oauth_personal_access_clients', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      client_id: { type: INTEGER.UNSIGNED, allowNull: false },
      created_at: { type: DATE },
      updated_at: { type: DATE },
    });

    await queryInterface.addIndex('oauth_personal_access_clients', { fields: [ 'client_id' ] });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_personal_access_clients');
  },
};
