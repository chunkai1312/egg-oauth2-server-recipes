'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE } = Sequelize

    await queryInterface.createTable('password_resets', {
      email: { type: STRING, allowNull: false },
      token: { type: STRING, allowNull: false },
      created_at: { type: DATE }
    })

    await queryInterface.addIndex('password_resets', { fields: ['email'] })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('password_resets')
  }
}
