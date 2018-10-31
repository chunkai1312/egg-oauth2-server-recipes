'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE, UUID } = Sequelize

    await queryInterface.createTable('oauth_authorization_codes', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      authorization_code: { type: STRING },
      expires_at: { type: DATE },
      redirect_uri: { type: TEXT },
      scope: { type: TEXT },
      client_id: { type: UUID, references: { model: 'oauth_clients', key: 'id' } },
      user_id: { type: UUID, references: { model: 'users', key: 'id' } }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_authorization_codes')
  }
}
