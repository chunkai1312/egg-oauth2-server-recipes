'use strict'

module.exports = () => {
  /**
   * OAuth2Server requires a model object through which some aspects of storage,
   * retrieval and custom validation are abstracted.
   *
   * @see https://oauth2-server.readthedocs.io/en/latest/model/overview.html
   */
  class Model {
    constructor (ctx) {
      this.ctx = ctx
      this.app = ctx.app
      this.config = ctx.app.config
    }

    /**
     * Invoked to generate a new access token.
     *
     * This model function is optional. If not implemented, a default handler is used that generates access tokens consisting of 40 characters in the range of `a..z0..9`.
     *
     * @param {Object} client - The client the access token is generated for.
     * @param {Object} user - The user the access token is generated for.
     * @param {String} scope - The scopes associated with the access token. Can be `null`.
     * @returns {String} - A `String` to be used as access token.
     */
    // async generateAccessToken (client, user, scope) {
    //   // TODO
    // }

    /**
     * Invoked to generate a new refresh token.
     *
     * This model function is optional. If not implemented, a default handler is used that generates refresh tokens consisting of 40 characters in the range of `a..z0..9`.
     *
     * @param {Object} client - The client the refresh token is generated for.
     * @param {Object} user - The user the refresh token is generated for.
     * @param {String} scope - The scopes associated with the refresh token. Can be `null`.
     * @returns {String} - A `String` to be used as refresh token.
     */
    // async generateRefreshToken (client, user, scope) {
    //  // TODO
    // }

    /**
     * Invoked to generate a new authorization code.
     *
     * This model function is optional. If not implemented, a default handler is used that generates authorization codes consisting of 40 characters in the range of `a..z0..9`.
     *
     * @param {Object} client - The client the authorization code is generated for.
     * @param {Object} user - The user the authorization code is generated for.
     * @param {String} scope - The scopes associated with the authorization code. Can be `null`.
     */
    // async generateAuthorizationCode (client, user, scope) {
    //   // TODO
    // }

    /**
     * Invoked to retrieve an existing access token previously saved through Model#saveToken().
     *
     * This model function is required if OAuth2Server#authenticate() is used.
     *
     * @param {String} accessToken - The access token to retrieve.
     * @returns {Object} token - The return value.
     * @returns {String} token.accessToken - The access token passed to `getAccessToken()`.
     * @returns {Date} token.accessTokenExpiresAt - The expiry time of the access token.
     * @returns {String} [token.scope] - The authorized scope of the access token.
     * @returns {Object} token.client - The client associated with the access token.
     * @returns {String} token.client.id - A unique string identifying the client.
     * @returns {Object} token.user - The user associated with the access token.
     */
    async getAccessToken (accessToken) {
      const oauthAccessToken = await this.ctx.model.OauthAccessToken.findByPk(accessToken)
      if (!oauthAccessToken) return false

      const client = await this.ctx.model.OauthClient.findByPk(oauthAccessToken.client_id)
      const user = await this.ctx.model.User.findByPk(oauthAccessToken.user_id)

      return {
        accessToken: oauthAccessToken.id,
        accessTokenExpiresAt: oauthAccessToken.expires_at,
        scope: oauthAccessToken.scope,
        client: client.toJSON(),
        user: user.toJSON()
      }
    }

    /**
     * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
     *
     * This model function is required if the refresh_token grant is used.
     *
     * @param {String} refreshToken - The access token to retrieve.
     * @returns {Object} token - The return value.
     * @returns {String} token.refreshToken - The refresh token passed to `getRefreshToken()`.
     * @returns {Date} [token.refreshTokenExpiresAt] - The expiry time of the refresh token.
     * @returns {String} [token.scope] - The authorized scope of the refresh token.
     * @returns {Object} token.client - The client associated with the refresh token.
     * @returns {String} token.client.id - A unique string identifying the client.
     * @returns {Object} token.user - The user associated with the refresh token.
     */
    async getRefreshToken (refreshToken) {
      const oauthRefreshToken = await this.ctx.model.OauthRefreshToken.findByPk(refreshToken)
      if (!oauthRefreshToken || oauthRefreshToken.revoked) return false

      const oauthAccessToken = await this.ctx.model.OauthAccessToken.findByPk(oauthRefreshToken.access_token_id)
      if (!oauthAccessToken) return false

      const client = await this.ctx.model.OauthClient.findByPk(oauthAccessToken.client_id)
      const user = await this.ctx.model.User.findByPk(oauthAccessToken.user_id)

      return {
        refreshToken: oauthRefreshToken.id,
        refreshTokenExpiresAt: oauthRefreshToken.expires_at,
        scope: oauthAccessToken.scope,
        client: client.toJSON(),
        user: user.toJSON()
      }
    }

    /**
     * Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
     *
     * This model function is required if the `authorization_code` grant is used.
     *
     * @param {String} authorizationCode - The authorization code to retrieve.
     * @returns {Object} code - The return value.
     * @returns {String} code.code - The authorization code passed to `getAuthorizationCode()`.
     * @returns {Date} code.expiresAt - The expiry time of the authorization code.
     * @returns {String} [code.redirectUri] - The redirect URI of the authorization code.
     * @returns {String} [code.scope] - The authorized scope of the authorization code.
     * @returns {Object} code.client - The client associated with the authorization code.
     * @returns {String} code.client.id - A unique string identifying the client.
     * @returns {Object} code.user - The user associated with the authorization code.
     */
    async getAuthorizationCode (authorizationCode) {
      const oauthAuthCode = await this.ctx.model.OauthAuthCode.findByPk(authorizationCode)
      if (!oauthAuthCode || oauthAuthCode.revoked) return false

      const client = await this.ctx.model.OauthClient.findByPk(oauthAuthCode.client_id)
      const user = await this.ctx.model.User.findByPk(oauthAuthCode.user_id)

      return {
        code: oauthAuthCode.id,
        expiresAt: oauthAuthCode.expires_at,
        redirectUri: client.redirect,
        scope: oauthAuthCode.scopes,
        client: client.toJSON(),
        user: user.toJSON()
      }
    }

    /**
     * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
     *
     * This model function is required for all grant types.
     *
     * @param {String} clientId - The client id of the client to retrieve.
     * @param {String} clientSecret - The client secret of the client to retrieve. Can be `null`.
     * @returns {Object} client - The return value.
     * @returns {String} client.id - A unique string identifying the client.
     * @returns {Array<String>} [client.redirectUris] - Redirect URIs allowed for the client. Required for the `authorization_code` grant.
     * @returns {Array<String>} client.grants - Grant types allowed for the client.
     * @returns {Number} [client.accessTokenLifetime] - Client-specific lifetime of generated access tokens in seconds.
     * @returns {Number} [client.refreshTokenLifetime] - Client-specific lifetime of generated refresh tokens in seconds.
     */
    async getClient (clientId, clientSecret) {
      const options = { where: { id: clientId } }
      if (clientSecret) options.where.secret = clientSecret
      const client = await this.ctx.model.OauthClient.findOne(options)
      if (!client) return false

      return {
        id: client.id,
        redirectUris: client.redirect.split(','),
        grants: this.config.oAuth2Server.grants
      }
    }

    /**
     * Invoked to retrieve a user using a username/password combination.
     *
     * This model function is required if the `password` grant is used.
     *
     * @param {String} username - The username of the user to retrieve.
     * @param {String} password - The user’s password.
     */
    async getUser (username, password) {
      // for aythentication grant
      if (this.ctx.user) {
        const user = await this.ctx.model.User.findByPk(this.ctx.user.id)
        return user.toJSON()
      }

      const user = await this.ctx.model.User.findOne({ where: { email: username } })
      if (!user) return false
      const isAuthenticated = user.authenticate(password)
      if (!isAuthenticated) return false
      return user.toJSON()
    }

    /**
     * Invoked to retrieve the user associated with the specified client.
     *
     * This model function is required if the `client_credentials` grant is used.
     *
     * @param {Object} client - The client to retrieve the associated user for.
     * @param {String} client.id - A unique string identifying the client.
     * @returns {Object} An Object representing the user, or a falsy value if the client does not have an associated user.
     *                   The user object is completely transparent to oauth2-server and is simply used as input to other model functions.
     */
    async getUserFromClient (client) {
      const oauthClient = await this.ctx.model.OauthClient.findByPk(client.id)
      if (!oauthClient || !oauthClient.user_id) return false

      const user = await this.ctx.model.User.findByPk(oauthClient.user_id)
      if (!user) return false

      return user.toJSON()
    }

    /**
     * Invoked to save an access token and optionally a refresh token, depending on the grant type.
     *
     * This model function is required for all grant types.
     *
     * @param {Object} token - The token(s) to be saved.
     * @param {String} token.accessToken - The access token to be saved.
     * @param {Date} token.accessTokenExpiresAt - The expiry time of the access token.
     * @param {String} [token.refreshToken] - The refresh token to be saved.
     * @param {Date} [token.refreshTokenExpiresAt] - The expiry time of the refresh token.
     * @param {String} [token.scope] - The authorized scope of the token(s).
     * @param {Object} client - The client associated with the token(s).
     * @param {Object} user - The user associated with the token(s).
     * @returns {Object} token - The return value.
     * @returns {String} token.accessToken - The access token passed to `saveToken()`.
     * @returns {Date} token.accessTokenExpiresAt - The expiry time of the access token.
     * @returns {String} token.refreshToken - The refresh token passed to saveToken().
     * @returns {Date} token.refreshTokenExpiresAt - The expiry time of the refresh token.
     * @returns {String} [token.scope] - The authorized scope of the access token.
     * @returns {Object} token.client - The client associated with the access token.
     * @returns {String} token.client.id - A unique string identifying the client.
     * @returns {Object} token.user - The user associated with the access token.
     */
    async saveToken (token, client, user) {
      // const accessToken = this.app.jwt.sign({
      //   jti: token.accessToken,
      //   sub: user.id,
      //   aud: client.id,
      //   iat: token.accessTokenExpiresAt - this.config.oAuth2Server.accessTokenLifetime,
      //   nbf: token.accessTokenExpiresAt - this.config.oAuth2Server.accessTokenLifetime,
      //   exp: new Date(token.accessTokenExpiresAt).getTime() / 1000,
      //   scopes: token.scope
      // }, this.config.jwt.secret)

      // const refreshToken = this.app.jwt.sign({
      //   jti: token.accessToken,
      //   sub: user.id,
      //   aud: client.id,
      //   iat: token.refreshTokenExpiresAt - this.config.oAuth2Server.refreshTokenLifetime,
      //   nbf: token.refreshTokenExpiresAt - this.config.oAuth2Server.refreshTokenLifetime,
      //   exp: new Date(token.refreshTokenExpiresAt).getTime() / 1000,
      //   scopes: token.scope
      // }, this.config.jwt.secret)

      const OauthAccessToken = await this.ctx.model.OauthAccessToken.create({
        id: token.accessToken,
        user_id: user.id,
        client_id: client.id,
        scope: token.scope,
        revoked: false,
        expires_at: token.accessTokenExpiresAt
      })

      if (token.refreshToken) {
        await this.ctx.model.OauthRefreshToken.create({
          id: token.refreshToken,
          access_token_id: OauthAccessToken.id,
          revoked: false,
          expires_at: token.refreshTokenExpiresAt
        })
      }

      return {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: token.scope,
        client,
        user
      }
    }

    /**
     * Invoked to save an authorization code.
     *
     * This model function is required if the authorization_code grant is used.
     *
     * @param {Object} code - The code to be saved.
     * @param {Object} code.authorizationCode - The authorization code to be saved.
     * @param {Date} code.expiresAt - The expiry time of the authorization code.
     * @param {String} code.redirectUri - The redirect URI associated with the authorization code.
     * @param {String} [code.scope] - The authorized scope of the authorization code.
     * @param {Object} client - The client associated with the authorization code.
     * @param {Object} user - The user associated with the authorization code.
     * @returns {Object} code - The return value.
     * @returns {String} code.authorizationCode - The authorization code passed to `saveAuthorizationCode()`.
     * @returns {Data} code.expiresAt - The expiry time of the authorization code.
     * @returns {String} code.redirectUri - The redirect URI associated with the authorization code.
     * @returns {String} [code.scope] - The authorized scope of the authorization code.
     * @returns {Object} code.client - The client associated with the authorization code.
     * @returns {String} code.client.id - A unique string identifying the client.
     * @returns {Object} code.user - The user associated with the authorization code.
     */
    async saveAuthorizationCode (code, client, user) {
      await this.ctx.model.OauthAuthCode.create({
        id: code.authorizationCode,
        user_id: user.id,
        client_id: client.id,
        scopes: code.scope,
        revoked: false,
        expires_at: code.expiresAt
      })

      return {
        authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        redirectUri: code.redirectUri,
        scope: code.scope,
        client,
        user
      }
    }

    /**
     * Invoked to revoke a refresh token.
     *
     * This model function is required if the `refresh_token` grant is used.
     *
     * @param {Object} token - The token to be revoked.
     * @param {String} token.refreshToken - The refresh token.
     * @param {Data} [token.refreshTokenExpiresAt] - The expiry time of the refresh token.
     * @param {String} [token.scope] - The authorized scope of the refresh token.
     * @param {Object} token.client - The client associated with the refresh token.
     * @param {String} token.client.id - A unique string identifying the client.
     * @param {Object} token.user - The user associated with the refresh token.
     * @returns {Boolean} Return `true` if the revocation was successful or `false` if the refresh token could not be found.
     */
    async revokeToken (token) {
      const oauthRefreshToken = await this.ctx.model.OauthRefreshToken.findByPk(token.refreshToken)
      if (!oauthRefreshToken) return false

      oauthRefreshToken.revoked = true
      await oauthRefreshToken.save()

      return true
    }

    /**
     * Invoked to revoke an authorization code.
     *
     * This model function is required if the `authorization_code` grant is used.
     *
     * @param {Object} code - The return value.
     * @param {String} code.code - The authorization code.
     * @param {Data} code.expiresAt - The expiry time of the authorization code.
     * @param {String} [code.redirectUri] - The redirect URI of the authorization code.
     * @param {String} [code.scope] - The authorized scope of the authorization code.
     * @param {Object} code.client - The client associated with the authorization code.
     * @param {String} code.client.id - A unique string identifying the client.
     * @param {Object} code.user - The user associated with the authorization code.
     * @returns {Boolean} Return `true` if the revocation was successful or `false` if the authorization code could not be found.
     */
    async revokeAuthorizationCode (code) {
      const oauthAuthCode = await this.ctx.model.OauthAuthCode.findByPk(code.code)
      if (!oauthAuthCode) return false

      oauthAuthCode.revoked = true
      await oauthAuthCode.save()

      return true
    }

    /**
     * Invoked to check if the requested scope is valid for a particular client/user combination.
     *
     * This model function is optional. If not implemented, any scope is accepted.
     *
     * @param {Object} user - The associated user.
     * @param {Object} client - The associated client.
     * @param {String} client.id - A unique string identifying the client.
     * @param {scope} scope - The scopes to validate.
     * @returns {*} Validated scopes to be used or a falsy value to reject the requested scopes.
     */
    async validateScope (user, client, scope) {
      return '*'
    }

    /**
     * Invoked during request authentication to check if the provided access token was authorized the requested scopes.
     *
     * This model function is required if scopes are used with OAuth2Server#authenticate().
     *
     * @param {Object} token - The access token to test against.
     * @param {String} token.accessToken - The access token.
     * @param {Date} [token.accessTokenExpiresAt] - The expiry time of the access token.
     * @param {String} [token.scope] - The authorized scope of the access token.
     * @param {Object} token.client - The client associated with the access token.
     * @param {String} token.client.id - A unique string identifying the client.
     * @param {Object} token.user - The user associated with the access token.
     * @param {String} scope - The required scopes.
     * @return {Boolean} Returns true if the access token passes, false otherwise.
     */
    async verifyScope (token, scope) {
      if (!token.scope) return false
      if (token.scope === '*') return true
      const requestedScopes = scope.split(' ')
      const authorizedScopes = token.scope.split(' ')
      return requestedScopes.every(scope => authorizedScopes.indexOf(scope) >= 0)
    }
  }

  return Model
}
