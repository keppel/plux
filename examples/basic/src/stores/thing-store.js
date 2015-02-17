var store = require("../../").store;

var ThingStore = store({
  actions: {
    "THING_UPDATED": function(payload) {
      // these automatically broadcast the change event
      console.log("handled thing")
      console.log(payload)
    },
    "THING_DELETED": function(payload) {

    }
  },
  methods: {
    getThingName: function() {
      return _privateData.something
    }
  },
  dispatcher: require("../../").dispatcher,
  actionPivot: "actionType", // optional. checks for this, then `actionType`, then `type`
  // waitFor: [someDispatchToken]
})

module.exports = ThingStore