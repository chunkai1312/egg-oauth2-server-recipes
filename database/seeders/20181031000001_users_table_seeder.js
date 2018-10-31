'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '40a17a9a-d45b-43d9-bda4-b9671a708b86',
        username: 'admin',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        email: 'admin@example.com',
        created_at: '2018-01-01T00:00:00.000Z',
        updated_at: '2018-01-01T00:00:00.000Z'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
