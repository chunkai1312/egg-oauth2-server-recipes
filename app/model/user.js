'use strict'

const bcrypt = require('bcrypt')

module.exports = app => {
  const { UUID, UUIDV4, STRING, TEXT, DATE } = app.Sequelize

  const User = app.model.define('user', {
    id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
    username: { type: STRING, allowNull: false, unique: true },
    password: { type: TEXT, allowNull: false },
    email: { type: STRING },
    created_at: { type: DATE },
    updated_at: { type: DATE }
  })

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
