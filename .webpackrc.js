'use strict'

const glob = require('glob')
const { name, version } = require('./package.json')

const findEntries = (path) => {
  const entries = glob.sync(`${path}/**/index.js`)

  return entries.reduce((entries, entry) => {
    const name = entry.replace(path + '/', '').replace('.js', '')
    entries[name] = entry
    return entries
  }, {})
}

module.exports = {
  "entry": findEntries('./app/assets/pages'),
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
