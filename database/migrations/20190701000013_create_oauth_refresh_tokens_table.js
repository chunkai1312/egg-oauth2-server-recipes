'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, BOOLEAN, DATE } = Sequelize

    await queryInterface.createTable('oauth_refresh_tokens', {
      id: { type: STRING(100), primaryKey: true },
      access_token_id: { type: STRING(100), allowNull: false },
      revoked: { type: BOOLEAN, allowNull: false },
      expires_at: { type: DATE }
    })

    await queryInterface.addIndex('oauth_refresh_tokens', { fields: ['access_token_id'] })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_refresh_tokens')
  }
}
