var Clock = require('./clock.jsx')
var React = require('react')

var App = React.createClass({

  render: function() {
    return (
      <div>
        <Clock />
      </div>
    );
  }

});

React.render(<App />, document.getElementById("app"))