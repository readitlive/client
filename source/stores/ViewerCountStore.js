var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var R = require('ramda');

var AppDispatcher = require('../dispatchers/appDispatcher');
var WSHelper = require('../helpers/WSHelper');
var API = require('../helpers/ApiHelper');
var constants = require('../constants/constants');
var PostsActions = require('../actions/PostsActions');

var CHANGE_EVENT = 'change';

var _count = 0;

var ViewerCountStore = assign({}, EventEmitter.prototype, {
  init: function(eventId) {
    _count = 0;
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
  getViewerCount: function() {
    return _count;
  }
});

ViewerCountStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.UPDATE_VIEWER_COUNT:
      _count = action.data.viewerCount
      ViewerCountStore.emitChange();
      break;
  }
  return true;
});

module.exports = ViewerCountStore;
