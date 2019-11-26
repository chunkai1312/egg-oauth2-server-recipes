'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {
  return function ensureEmailVerified(ctx, next) {
    if (!ctx.user.email_verified_at) {
      return ctx.redirect('/email/verify');
    }
    return next();
  };
};
