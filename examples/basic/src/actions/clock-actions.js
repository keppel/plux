var dispatcher = require('../../../../').dispatcher
setInterval(function() {
  dispatcher.dispatch({
    actionType: "TIME_CHANGED"
  })
}, 1000)