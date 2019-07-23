'use strict'

const bcrypt = require('bcrypt')

module.exports = app => {
  const { BIGINT, STRING, DATE } = app.Sequelize

  const User = app.model.define('user', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    email: { type: STRING, allowNull: false },
    email_verified_at: { type: DATE },
    password: { type: STRING, allowNull: false },
    remember_token: { type: STRING(100) },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  }, { tableName: 'users' })

  User.prototype.authenticate = function (password, hashedPassword) {
    return bcrypt.compareSync(password, this.get('password'))
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    return values
  }

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(user.password, salt)
    }
  })

  return User
}
