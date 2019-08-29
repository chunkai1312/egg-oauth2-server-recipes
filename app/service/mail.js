'use strict'

const Service = require('egg').Service
const mailer = require('nodemailer')
const { promisify } = require('util')
const crypto = require('crypto')
const ms = require('ms')
const randomBytesAsync = promisify(crypto.randomBytes)

class MailService extends Service {

  async sendMail (mailerOptions) {
    const config = this.config
    const { defaults, ...options } = config.mail
    const transporter = mailer.createTransport(options, defaults)

    /* istanbul ignore next */
    if (!config.debug) return transporter.sendMail(mailerOptions)
  }

  async sendPasswordResetMail (user) {
    const config = this.config

    const token = await randomBytesAsync(16).then(buffer => buffer.toString('hex'))
    await this.ctx.model.PasswordReset.create({ email: user.email, token })

    const mailerOptions = {
      to: user.email,
      subject: `[${config.name}] Reset Password`,
      html: `<p>Hello!</p>
        <p>You are receiving this email because we received a password reset request for your account.</p>
        <a href="${config.url}/password/reset/${token}?email=${user.email}">Reset Password</a>
        <p>If you did not request a password reset, no further action is required.</p>
        <p>Regards,</p>
        <p>${config.name}</p>
      `
    }

    return this.sendMail(mailerOptions)
  }

  async sendVerificationMail (user) {
    const config = this.config

    const expires = Date.now() + ms('1h')
    const original = `${config.url}/email/verify/${user.id}?expires=${expires}`
    const signature = crypto.createHmac('sha256', config.keys).update(original).digest().toString('hex')

    const mailerOptions = {
      to: user.email,
      subject: `[${config.name}] Reset Password`,
      html: `<p>Hello!</p>
        <p>Please click the button below to verify your email address.</p>
        <a href="${config.url}/email/verify/${user.id}?expires=${expires}&signature=${signature}">Verify Email Address</a>
        <p>If you did not create an account, no further action is required.</p>
        <p>Regards,</p>
        <p>${config.name}</p>
      `
    }

    return this.sendMail(mailerOptions)
  }

}

module.exports = MailService
