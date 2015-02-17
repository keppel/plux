var clockStore = require('../stores/clock-store.js')

var React = require('react');

var _getState = function() {
  return {
    time: clockStore.getSeconds()
  }
}

var Clock = React.createClass({
  mixins: [
    clockStore.mixin(_getState)
  ],
  render: function() {
    return (
      <div>
        {this.state.time}
      </div>
    );
  }

});

module.exports = Clock;