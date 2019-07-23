'use strict'

const bcrypt = require('bcrypt')

module.exports = app => {
  const { STRING, DATE } = app.Sequelize

  const User = app.model.define('password_reset', {
    email: { type: STRING, allowNull: false },
    token: { type: STRING, allowNull: false },
    created_at: { type: DATE }
  }, { tableName: 'password_resets', timestamps: true, createdAt: 'created_at', updatedAt: false })

  User.prototype.authenticate = function (password, hashedPassword) {
    return bcrypt.compareSync(password, this.get('password'))
  }

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(user.password, salt)
    }
  })

  return User
}
