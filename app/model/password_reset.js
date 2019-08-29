'use strict'

const ms = require('ms')

module.exports = app => {
  const { STRING, DATE } = app.Sequelize

  const PasswordReset = app.model.define('password_reset', {
    email: { type: STRING, allowNull: false, primaryKey: true },
    token: { type: STRING, allowNull: false },
    created_at: { type: DATE }
  }, {
    tableName: 'password_resets',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  })

  PasswordReset.findByCredentials = function ({ email, token }) {
    return this.findOne({ where: { email, token } })
  }

  PasswordReset.prototype.isValid = function () {
    const expiresAt = this.get('created_at').getTime() + ms('1d')
    return Date.now() <= expiresAt
  }

  return PasswordReset
}
