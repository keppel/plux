## Plux

Plux is a simple, vanilla implementation of facebook's flux with an elegant API. Plux makes writing flux apps easy and fun.

Plux aims to eliminate most or all of the boilerplate typically involved in using the flux architecture.


### Stores
Writing stores with plux is super easy. Just use `actions` to handle stuff from the dispatcher, and `methods` to expose data to components.

No more big hairy switch statements. Declaratively reconcile events from the dispatcher by providing a map of `{ ACTION_NAMES: handlerFunctions }` as `actions` and a callback will automatically be registered with the dispatcher.


```js
var store = require('plux').store
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
```

### Component mixins
Subscribing a component to updates from a plux store is ridiculously simple. 

Here's a complete component that re-renders on every change in the store from the above section.

```jsx
var ClockStore = require('../stores/ClockStore.js')
var React = require('react');

var _getState = function() {
  return {
    time: ClockStore.getSeconds()
  }
}

var Clock = React.createClass({
  mixins: [
    ClockStore.mixin(_getState)
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
```

Simply pass a function that returns the component's complete state to the mixin, and plux will handle the rest.

### Dispatcher

Since flux apps should only contain a single dispatcher, plux includes an instantiated flux dispatcher. Stores use this by default unless you specify a different dispatcher for them to use.

```js
var dispatcher = require("plux").dispatcher  // automatically instantiated, ready to go.

dispatcher.dispatch({
  actionType: "TIME_CHANGED",
  foo: "bar"
})
```


## API reference
```js 
var plux = require("plux")
```

### var s = plux.store(opts={})

Available properties for `opts`:
- `actions` : action names as keys, payload handler functions as values.
- `methods` : methods to expose to consumers of the store.
- `dispatcher` : flux dispatcher instance with which to register the callback. optional, uses plux.dispatcher by default.
- `actionPivot` : key used to identify the action type. defaults to `"actionType"`.
- `waitFor` : [dispatchToken]

Props on `s`:
- EventEmitter's methods.
- `dispatchToken` : token returned from registering the store's callback with the dispatcher.
- `addChangeListener(func)` : add listener when store changes.
- `removeChangeListener(func)` : remove listener, duh.
- `mixin(stateGetter)` : handle all re-rendering logic for the component. just provide a function that gets all of that component's state.
- all the methods you put in `opts.methods`.


## Meta

### License
MIT

### Credits
Plux is developed by SEND in Seattle. We're hiring! Email us at jobs@joinsend.com

<img src="https://joinsend.com/src/modules/footer/big-logo-green.png" alt="Send logo" height="37" width="132" />
