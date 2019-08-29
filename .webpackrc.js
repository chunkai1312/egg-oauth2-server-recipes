'use strict'

const { name, version } = require('./package.json')

module.exports = {
  "entry": "./app/assets/js/app.js",
  "env": {
    "development": {}
  },
  "outputPath": "app/public",
  "hash": true,
  "manifest": {
    "fileName": "../../config/manifest.json"
  },
  "define": {
    "process.env.APP_NAME": process.env.APP_NAME || name,
    "process.env.APP_VERSION": process.env.APP_VERSION || version,
  },
  "es5ImcompatibleVersions": true
}
