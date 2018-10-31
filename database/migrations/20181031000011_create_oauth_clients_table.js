'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, UUID } = Sequelize

    await queryInterface.createTable('oauth_clients', {
      id: { type: UUID, primaryKey: true },
      name: { type: STRING },
      secret: { type: STRING },
      redirect_uri: { type: TEXT },
      grant_types: { type: STRING },
      scope: { type: TEXT },
      user_id: { type: UUID, references: { model: 'users', key: 'id' } }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_clients')
  }
}
