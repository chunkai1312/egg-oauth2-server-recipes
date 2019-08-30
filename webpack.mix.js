'use strict'

const mix = require('laravel-mix')

mix.browserSync(process.env.APP_URL)

mix
  .js('app/assets/js/app.js', 'app/public/js')
  .sass('app/assets/sass/app.scss', 'app/public/css')
  .setPublicPath('app/public')
  .copy('app/public/mix-manifest.json', 'config/manifest.json')
