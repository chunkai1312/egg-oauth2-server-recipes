'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DATE } = Sequelize;

    await queryInterface.createTable('users', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      email_verified_at: { type: DATE },
      password: { type: STRING, allowNull: false },
      remember_token: { type: STRING(100) },
      created_at: { type: DATE },
      updated_at: { type: DATE },
    });

    await queryInterface.addIndex('users', { fields: [ 'email' ], unique: true });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
