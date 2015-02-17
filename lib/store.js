var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change"

var PluxStore = function(args) {
  var args = args || {}
  /**
   * Compile the store's public methods
   */
  var methods = args.methods || {}
  var _store = assign({}, EventEmitter.prototype, methods, {
    addChangeListener: function(handler) {
      _store.on(CHANGE_EVENT, handler)
    },
    removeChangeListener: function(handler) {
      _store.removeListener(CHANGE_EVENT, handler)
    },
    mixin: function(getState) {

      return {
        getInitialState: function() {
          if(!this._pluxGotInitialState){
            this._pluxGotInitialState = true;
            return getState();
          }
        },
        componentWillMount: function() {
          this._pluxChangeHandler = function() {
            this.setState(getState())
          }.bind(this)
          _store.on(CHANGE_EVENT, this._pluxChangeHandler)
        },
        componentWillUnmount: function() {
          _store.removeListener(CHANGE_EVENT, this._pluxChangeHandler)
        }
      }
    }
  })

  /**
   * Build the dispatcher callback
   */
  var actions = args.actions || {}
  var dispatcher = args.dispatcher || require("../").dispatcher;

  var dispatcherCallback = function(payload) {
    
    /**
     * Handle `waitFor` if it was passed
     */
  
      if(args.waitFor && dispatcher.waitFor){
        dispatcher.waitFor(args.waitFor)
      }

    /**
     * Call the action handler if it exists
     */
    var handler = actions[payload[args.actionPivot]] ||
                  actions[payload.actionType]        ||
                  actions[payload.type];

    if(typeof handler === "function"){
      handler(payload)
      _store.emit(CHANGE_EVENT)
    }
  }

  /**
   * Register callback with the dispatcher if it was provided.
   * Set store.dispatchToken to the token returned from the provided dispatcher
   */
  _store.dispatchToken = dispatcher.register(dispatcherCallback)


  return _store
};

module.exports = PluxStore;

