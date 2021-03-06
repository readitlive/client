var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatchers/appDispatcher');
var API = require('../helpers/ApiHelper');
var constants = require('../constants/constants');
var EventActions = require('../actions/EventActions');

var CHANGE_EVENT = 'change';

var _event = {};

var EventStore = assign({}, EventEmitter.prototype, {
  init: function(eventId) {
    if (eventId !== _event._id) {
      _event = {};
      API('GET', 'event/' + eventId, undefined, EventActions.receiveEvent);
    }
  },

  emitChange: function() {
    return this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  },
  getEvent: function() {
    return _event || {};
  },

  eventIsLive: function() {
    return !!_event.eventIsLive;
  }
});

EventStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_EVENT:
      _event = action.event;
      EventStore.emitChange();
      break;
    case constants.EVENT_LIVE_TOGGLE:
      _event.eventIsLive = !_event.eventIsLive;
      EventStore.emitChange();
      break;
  }
  return true;
});

module.exports = EventStore;
