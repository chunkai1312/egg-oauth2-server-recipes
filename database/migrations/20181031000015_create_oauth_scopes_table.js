'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, BOOLEAN } = Sequelize

    await queryInterface.createTable('oauth_scopes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      scope: { type: TEXT },
      is_default: { type: BOOLEAN }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_scopes')
  }
}
