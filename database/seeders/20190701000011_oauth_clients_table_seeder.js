'use strict'; /* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('oauth_clients', [
      {
        id: 1,
        user_id: null,
        name: 'default',
        secret: 'naAYfxmPERK2LvBgoeYZf9iyIQSGMLqz',
        redirect: 'http://localhost',
        personal_access_client: true,
        password_client: false,
        revoked: false,
        created_at: '2019-07-01T00:00:00.000Z',
        updated_at: '2019-07-01T00:00:00.000Z',
      },
      {
        id: 2,
        user_id: 1,
        name: 'default',
        secret: 'z3TnYKhdXM7KerUJTmtVbV27TSK2cHN5',
        redirect: 'http://localhost:7001/passport/oauth2/callback',
        personal_access_client: false,
        password_client: true,
        revoked: false,
        created_at: '2019-07-01T00:00:00.000Z',
        updated_at: '2019-07-01T00:00:00.000Z',
      },
    ], {});

    await queryInterface.sequelize.query(`ALTER SEQUENCE "oauth_clients_id_seq" RESTART WITH ${2}`);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('oauth_clients', null, {});
  },
};
