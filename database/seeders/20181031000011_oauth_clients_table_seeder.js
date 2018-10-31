'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('oauth_clients', [
      {
        id: '9d549d17-9a5b-4235-840c-6808c96f83d1',
        name: 'demo',
        secret: 'z3TnYKhdXM7KerUJTmtVbV27TSK2cHN5',
        redirect_uri: 'http://localhost:7002',
        grant_types: 'authorization_code,password,refresh_token,client_credentials,implicit',
        scope: '*',
        user_id: '40a17a9a-d45b-43d9-bda4-b9671a708b86'
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('oauth_clients', null, {})
  }
}
