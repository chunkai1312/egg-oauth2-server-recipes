'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE, UUID } = Sequelize

    await queryInterface.createTable('oauth_refresh_tokens', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      refresh_token: { type: STRING },
      expires_at: { type: DATE },
      scope: { type: TEXT },
      client_id: { type: UUID, references: { model: 'oauth_clients', key: 'id' } },
      user_id: { type: UUID, references: { model: 'users', key: 'id' } }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_refresh_tokens')
  }
}
