'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, BOOLEAN, DATE } = Sequelize

    await queryInterface.createTable('oauth_clients', {
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_clients')
  }
}
