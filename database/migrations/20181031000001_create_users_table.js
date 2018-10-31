'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { UUID, STRING, TEXT, DATE } = Sequelize

    await queryInterface.createTable('users', {
      id: { type: UUID, primaryKey: true },
      username: { type: STRING, allowNull: false, unique: true },
      password: { type: TEXT, allowNull: false },
      email: { type: STRING, allowNull: false, unique: true },
      created_at: { type: DATE },
      updated_at: { type: DATE }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
