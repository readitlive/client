var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var R = require('ramda');

var AppDispatcher = require('../dispatchers/appDispatcher');
var WSHelper = require('../helpers/WSHelper');
var API = require('../helpers/ApiHelper');
var constants = require('../constants/constants');
var PostsActions = require('../actions/PostsActions');

var CHANGE_EVENT = 'change';

var _comments = [];

var CommentsStore = assign({}, EventEmitter.prototype, {
  init: function(eventId) {
    _comments = [];
    API('GET', 'event/' + eventId + '/entry', {}, PostsActions.receivePosts);
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
  getComments: function() {
    if (_comments.length) {
      return R.reverse(_comments);
    }
    return [];
  }
});

CommentsStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_COMMENT:
      _comments.push(action.data.entry);
      CommentsStore.emitChange();
      break;
    // case constants.DELETE_POST:
    //   var index = R.findIndex(R.propEq('_id', action.data.entryId))(_comments);
    //   _comments = R.remove(index, 1, _comments);
    //   CommentsStore.emitChange();
    //   break;
    // case constants.PUT_POST:
    //   var index = R.findIndex(R.propEq('_id', action.data.entryId))(_comments);
    //   _comments[index] = action.data.entry;
    //   CommentsStore.emitChange();
    //   break;
  }
  return true;
});

module.exports = CommentsStore;
