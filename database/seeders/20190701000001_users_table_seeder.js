'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '1',
        name: 'Admin',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        email: 'admin@example.com',
        created_at: '2019-07-01T00:00:00.000Z',
        updated_at: '2019-07-01T00:00:00.000Z',
      },
    ], {});

    await queryInterface.sequelize.query(`ALTER SEQUENCE "users_id_seq" RESTART WITH ${2}`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
