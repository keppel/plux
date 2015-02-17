var store = require('../../../../').store

var _seconds = 0;

var ClockStore = module.exports = store({

  actions: {
    "TIME_CHANGED": function(payload) {
      _seconds++;
    }
  },

  methods: {
    getSeconds: function() {
      return _seconds
    }
  }

})