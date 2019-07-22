'use strict';

module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
  ],
  dep: [
    'bcrypt',
    'egg',
    'egg-oauth2-server',
    'egg-passport',
    'egg-passport-local',
    'egg-scripts',
    'egg-sequelize',
    'egg-view-nunjucks',
    'koa2-ensure-login',
  ],
  devdep: [
    'autod',
    'autod-egg',
    'egg-bin',
    'egg-mock',
    'eslint',
    'eslint-config-egg',
    'eslint-config-standard',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'eslint-plugin-standard',
    'factory-girl',
    'sequelize-cli',
  ],
  exclude: [
    './test/fixtures',
  ],
};
