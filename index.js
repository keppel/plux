var dispatcher = require('./lib/dispatcher.js')

module.exports = {
  store: require('./lib/store.js'),
  dispatcher: dispatcher,
  dispatch: dispatcher.dispatch
}